import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    applyNodeChanges,
    Background,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    MiniMap,
    NodeChange,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './reactflow.css';

import ResourceNode from './components/Nodes/ResourceNode';
import VariableNode from './components/Nodes/VariableNode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    addNode,
    addSubNode,
    onConnect,
    onEdgesChange,
    onEdgesUpdate,
    onNodesChange,
} from '../FlowSlice';
import resourceLookup from '../../resources/ResourceLookup';
import SidebarComponent from '../Sidebar/SidebarComponent';
import SelectEdge from './components/Edges/SelectEdge';
import BlockNode from './components/Nodes/BlockNode';
// import SubResourceNode from './components/Nodes/SubResourceNode';

const connectionLineStyle = { stroke: 'black' };
const nodeTypes = {
    resourceNode: ResourceNode,
    dataNode: VariableNode,
    blockNode: BlockNode,
};

const edgeTypes = {
    selectEdge: SelectEdge,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const ReactFlowComponent = () => {
    const dispatch = useDispatch();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const nodes = useSelector((state: RootState) => state.flow.nodes);
    const [localNodes, setLocalNodes] = useState(nodes);
    const [nodeChanges, setNodeChanges] = useState<NodeChange[]>([]);
    // const [localSelect, setLocalSelect] = useState<NodeChange[]>([]);

    const edges = useSelector((state: RootState) => state.flow.edges);

    useEffect(() => {
        setLocalNodes(nodes);
    }, [nodes]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (nodeChanges) {
                dispatch(onNodesChange([...nodeChanges]));
            }
        }, 250);

        return () => {
            clearTimeout(timer);
        };
    }, [nodeChanges]);

    // TODO: Fix deleting resources quickly before redux updates issue
    const nodeChange = (changes: NodeChange[]) => {
        if (changes[0].type === 'position' && changes[0].dragging) {
            setNodeChanges((prevState) => {
                return [
                    ...prevState.filter(
                        (x) =>
                            x.type === 'select' ||
                            (x.type === 'position' &&
                                changes[0].type === 'position' &&
                                x.id !== changes[0].id),
                    ),
                    changes[0],
                ];
            });
        } else if (changes[0].type === 'select') {
            // dispatch(onNodesChange(changes));
            // setNodeChanges((prevState) => [...prevState, ...changes]);
            // setLocalSelect(() => changes);
            // Add this back to add select redux changes
            // setNodeChanges((prevState) => {
            //     return [
            //         ...prevState.filter((x) => x.type !== 'select'),
            //         changes[0],
            //     ];
            // });
        }
        setLocalNodes((prevState) => applyNodeChanges(changes, prevState));
        // dispatch(onNodesChange(changes));
    };

    const edgeChange = (changes: EdgeChange[]) => {
        dispatch(onEdgesChange(changes));
    };

    const edgeConnect = (changes: Connection) => {
        dispatch(onConnect(changes));
    };

    const edgeUpdateSuccessful = useRef(true);

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const edgeUpdate = useCallback(
        (oldEdge: Edge, newConnection: Connection) => {
            edgeUpdateSuccessful.current = true;

            if (
                newConnection.sourceHandle &&
                newConnection.targetHandle?.includes(newConnection.sourceHandle)
            ) {
                dispatch(
                    onEdgesUpdate({
                        oldEdge,
                        newConnection,
                    }),
                );
            }
        },
        [dispatch],
    );

    const onEdgeUpdateEnd = useCallback(
        (_: any, edge: Edge) => {
            if (!edgeUpdateSuccessful.current) {
                dispatch(
                    onEdgesChange([
                        {
                            id: edge.id,
                            type: 'remove',
                        },
                    ]),
                );
            }

            edgeUpdateSuccessful.current = true;
        },
        [dispatch],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            if (!reactFlowWrapper.current) {
                return;
            }

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const nodeType = event.dataTransfer.getData('application/nodeType');
            const resourceName = event.dataTransfer.getData(
                'application/resourceName',
            );

            // check if the dropped element is valid
            if (typeof nodeType === 'undefined' || !nodeType) {
                return;
            }

            if (typeof resourceName === 'undefined' || !resourceName) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            if (nodeType === 'resource') {
                const res = resourceLookup.find((x) => x.name === resourceName);

                if (res) {
                    dispatch(
                        addNode({
                            name: res.name,
                            position: position,
                        }),
                    );
                }
            } else if (nodeType === 'block') {
                const parent = resourceName.split('/')[0];
                const sub = resourceName.split('/')[1];

                const res = resourceLookup.find((x) => x.name === parent);

                if (res) {
                    dispatch(
                        addSubNode({
                            name: sub,
                            parentResourceName: parent,
                            position: position,
                        }),
                    );
                }
            }
        },
        [reactFlowInstance, dispatch],
    );

    return (
        <div className="h-full flex">
            <ReactFlowProvider>
                <div
                    className="reactflow-wrapper flex-grow min-h-full"
                    ref={reactFlowWrapper}
                >
                    <ReactFlow
                        nodes={localNodes}
                        edges={edges}
                        onNodesChange={nodeChange}
                        onEdgesChange={edgeChange}
                        onEdgeUpdate={edgeUpdate}
                        onEdgeUpdateStart={onEdgeUpdateStart}
                        onEdgeUpdateEnd={onEdgeUpdateEnd}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onConnect={edgeConnect}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        connectionLineStyle={connectionLineStyle}
                        defaultViewport={defaultViewport}
                        onInit={setReactFlowInstance}
                        fitView
                        fitViewOptions={{
                            padding: 1.5,
                            duration: 1000,
                        }}
                        attributionPosition="bottom-left"
                        defaultEdgeOptions={{
                            style: { stroke: '#844fba', strokeWidth: '2px' },
                        }}
                    >
                        <MiniMap zoomable pannable />
                        <Controls />
                        <Background
                            className="bg-gray-700"
                            color="#844fba"
                            gap={25}
                            size={2}
                        />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
            <SidebarComponent />
        </div>
    );
};

export default ReactFlowComponent;
