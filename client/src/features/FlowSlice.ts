import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addEdge,
    applyNodeChanges,
    Connection,
    Edge,
    Node,
    NodeChange,
} from 'reactflow';
import {
    IResourceKeyState,
    IResourceState,
} from '../interfaces/IResourceState';

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
        addNode: (state, action: PayloadAction<IResourceState>) => {
            state.nodes.push({
                id: Math.random().toString(),
                position: { x: 100, y: 50 },
                data: { resourceState: action.payload },
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
    },
});

export const { addNode, onNodesChange, onConnect, updateNodeKey } =
    flowSlice.actions;

export default flowSlice;
