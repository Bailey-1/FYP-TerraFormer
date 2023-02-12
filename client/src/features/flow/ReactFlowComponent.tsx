import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Connection,
    Controls,
    MiniMap,
    Position,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';
import ResourceNode from './components/ResourceNode';
import DataNode from './components/DataNode';

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const nodeTypes = {
    resourceNode: ResourceNode,
    dataNode: DataNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const ReactFlowComponent = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange = (event: any) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== '2') {
                        return node;
                    }

                    const color = event.target.value;

                    setBgColor(color);

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            color,
                        },
                    };
                }),
            );
        };

        setNodes([
            {
                id: '1',
                type: 'input',
                data: { label: 'An input node' },
                position: { x: 0, y: 50 },
                sourcePosition: Position.Right,
            },
            {
                id: '2',
                type: 'selectorNode',
                data: { onChange: onChange, color: initBgColor },
                style: { border: '1px solid #777', padding: 10 },
                position: { x: 300, y: 50 },
            },
            {
                id: '3',
                type: 'output',
                data: { label: 'Output A' },
                position: { x: 650, y: 25 },
                targetPosition: Position.Left,
            },
            {
                id: '4',
                type: 'output',
                data: { label: 'Output B' },
                position: { x: 650, y: 100 },
                targetPosition: Position.Left,
            },
            {
                id: '5',
                type: 'resourceNode',
                data: null,
                position: { x: 300, y: 50 },
            },
            {
                id: '6',
                type: 'dataNode',
                data: null,
                position: { x: 400, y: 50 },
            },
        ]);

        setEdges([
            {
                id: 'e1-2',
                source: '1',
                target: '2',
                style: { stroke: '#fff' },
            },
            {
                id: 'e2a-3',
                source: '2',
                target: '3',
                sourceHandle: 'a',
                style: { stroke: '#fff' },
            },
            {
                id: 'e2b-4',
                source: '2',
                target: '4',
                sourceHandle: 'b',
                style: { stroke: '#fff' },
            },
        ]);
    }, []);

    const onConnect = useCallback(
        (params: Connection) =>
            setEdges((eds) =>
                addEdge(
                    { ...params, animated: false, style: { stroke: '#fff' } },
                    eds,
                ),
            ),
        [],
    );
    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                // style={{ background: bgColor }}
                nodeTypes={nodeTypes}
                connectionLineStyle={connectionLineStyle}
                defaultViewport={defaultViewport}
                fitView
                attributionPosition="bottom-left"
            >
                <MiniMap zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} size={2} />
            </ReactFlow>
        </ReactFlowProvider>
    );
};

export default ReactFlowComponent;
