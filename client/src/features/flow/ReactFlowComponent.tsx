import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
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

import ResourceNode from './components/ResourceNode';
import DataNode from './components/DataNode';
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
import Sidebar from '../sidebar/Sidebar';

const connectionLineStyle = { stroke: 'black' };
const nodeTypes = {
    resourceNode: ResourceNode,
    dataNode: DataNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const ReactFlowComponent = () => {
    const dispatch = useDispatch();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const nodes = useSelector((state: RootState) => state.flow.nodes);
    const edges = useSelector((state: RootState) => state.flow.edges);

    const nodeChange = (changes: NodeChange[]) => {
        dispatch(onNodesChange(changes));
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
            dispatch(
                onEdgesUpdate({
                    oldEdge,
                    newConnection,
                }),
            );
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
                dispatch(addNode({ name: res.name, position: position }));
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
                        nodes={nodes}
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
                        connectionLineStyle={connectionLineStyle}
                        defaultViewport={defaultViewport}
                        onInit={setReactFlowInstance}
                        fitView
                        attributionPosition="bottom-left"
                        defaultEdgeOptions={{ style: { stroke: 'black' } }}
                    >
                        <MiniMap zoomable pannable />
                        <Controls />
                        <Background
                            className="bg-gray-800"
                            color="#38bdf8"
                            gap={25}
                            size={2}
                        />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
            <Sidebar />
        </div>
    );
};

export default ReactFlowComponent;
