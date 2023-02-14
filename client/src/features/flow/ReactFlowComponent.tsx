import React from 'react';
import ReactFlow, {
    Background,
    Connection,
    Controls,
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
import { onConnect, onNodesChange } from '../FlowSlice';

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

    const edgeConnect = (changes: Connection) => {
        dispatch(onConnect(changes));
    };

    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={nodeChange}
                // onEdgesChange={onEdgesChange}
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
