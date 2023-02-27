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
    onConnect,
    onEdgesChange,
    onEdgesUpdate,
    onNodesChange,
} from '../FlowSlice';
import resourceLookup from '../../resources/ResourceLookup';
import SidebarComponent from '../Sidebar/SidebarComponent';
import SelectEdge from './components/Edges/SelectEdge';
import SubResourceNode from './components/Nodes/BlockNode';
// import SubResourceNode from './components/Nodes/SubResourceNode';

const connectionLineStyle = { stroke: 'black' };
const nodeTypes = {
    resourceNode: ResourceNode,
    dataNode: VariableNode,
    subResourceNode: SubResourceNode,
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
    const [localSelect, setLocalSelect] = useState<NodeChange[]>([]);

    const edges = useSelector((state: RootState) => state.flow.edges);

    useEffect(() => {
        setLocalNodes(nodes);
    }, [nodes]);

    useEffect(() => {
        // console.log('useeffect');
        const timer = setTimeout(() => {
            // console.log('dispatch called');
            if (nodeChanges) {
                // console.log(nodeChanges);
                // dispatch(onNodesChange(localSelect));
                dispatch(onNodesChange([...nodeChanges]));
            }
        }, 250);

        return () => {
            // console.log('timer cleared');
            clearTimeout(timer);
        };
    }, [nodeChanges]);

    const nodeChange = (changes: NodeChange[]) => {
        // console.log('nodechange');
        // console.log(changes[0].type);

        if (changes[0].type === 'position' && changes[0].dragging) {
            // setNodeChanges((prevState) => changes);
            // console.log('local changes ', changes[0]);
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
            setNodeChanges((prevState) => {
                return [
                    ...prevState.filter((x) => x.type !== 'select'),
                    changes[0],
                ];
            });
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
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const res = resourceLookup.find((x) => x.name === type);

            if (res) {
                dispatch(
                    addNode({
                        name: res.name,
                        position: position,
                    }),
                );
            }
        },
        [reactFlowInstance, dispatch],
    );

    return (
        <div className="h-full flex">
            <ReactFlowProvider>
                <div
                    className="reactflow-wrapper flex-grow h-full"
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
