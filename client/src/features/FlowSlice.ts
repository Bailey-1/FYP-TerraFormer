import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    updateEdge,
    XYPosition,
} from 'reactflow';
import { IResourceKeyState } from '../interfaces/IResourceState';
import ResourceLookup from '../resources/ResourceLookup';

// Define a type for the slice state
interface CounterState {
    nodes: Node[];
    edges: Edge[];
}

// Define the initial state using that type
const initialState: CounterState = {
    nodes: [],
    edges: [],
};

export const flowSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode: (
            state,
            action: PayloadAction<{ name: string; position: XYPosition }>,
        ) => {
            state.nodes.push({
                id: Math.random().toString(),
                position: action.payload.position,
                selectable: true,
                data: {
                    resourceState: {
                        id: Math.random().toString(),
                        type: action.payload.name,
                        valid: false,
                        instance_name: action.payload.name,
                        instance_name_valid: false,
                        keys:
                            ResourceLookup.find(
                                (y) => y.name === action.payload.name,
                            )?.keys.map((key: any) => {
                                return {
                                    id: Math.random().toString(),
                                    name: key.name,
                                    value: '',
                                    valid: false,
                                };
                            }) || [],
                    },
                },
                type: 'resourceNode',
            });
        },
        onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        onConnect: (state, action: PayloadAction<Connection>) => {
            // Check node is different from self
            if (action.payload.source !== action.payload.target) {
                state.edges = addEdge(action.payload, state.edges);
            }
        },
        updateNodeKey: (
            state,
            action: PayloadAction<{
                nodeId: string;
                key: string;
                value: string;
            }>,
        ) => {
            const node = state.nodes.find(
                (x) => x.id === action.payload.nodeId,
            );

            if (!node) {
                console.error('Resource does not exist', action.payload);
                return;
            }

            const existingEl = node.data.resourceState.keys.find(
                (x: IResourceKeyState) => x.name === action.payload.key,
            );

            if (existingEl) {
                existingEl.value = action.payload.value;
            } else {
                node.data.resourceState.keys.push({
                    id: Math.random().toString(),
                    name: action.payload.key,
                    value: action.payload.value,
                    valid: true,
                });
            }
        },
        onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        onEdgesUpdate: (
            state,
            action: PayloadAction<{
                oldEdge: Edge;
                newConnection: Connection;
            }>,
        ) => {
            state.edges = updateEdge(
                action.payload.oldEdge,
                action.payload.newConnection,
                state.edges,
            );
        },
    },
});

export const {
    addNode,
    onNodesChange,
    onConnect,
    updateNodeKey,
    onEdgesChange,
    onEdgesUpdate,
} = flowSlice.actions;

export default flowSlice;
