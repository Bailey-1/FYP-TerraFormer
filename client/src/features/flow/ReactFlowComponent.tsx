import React, { useCallback, useRef } from 'react';
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

import './index.css';
import ResourceNode from './components/ResourceNode';
import DataNode from './components/DataNode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    onConnect,
    onEdgesChange,
    onEdgesUpdate,
    onNodesChange,
} from '../FlowSlice';

const connectionLineStyle = { stroke: 'black' };
const nodeTypes = {
    resourceNode: ResourceNode,
    dataNode: DataNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const ReactFlowComponent = () => {
    const dispatch = useDispatch();

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
        [],
    );

    const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
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
    }, []);

    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={nodeChange}
                onEdgesChange={edgeChange}
                onEdgeUpdate={edgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onConnect={edgeConnect}
                nodeTypes={nodeTypes}
                connectionLineStyle={connectionLineStyle}
                defaultViewport={defaultViewport}
                fitView
                attributionPosition="bottom-left"
                defaultEdgeOptions={{ style: { stroke: 'black' } }}
            >
                <MiniMap zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} size={2} />
            </ReactFlow>
        </ReactFlowProvider>
    );
};

export default ReactFlowComponent;
