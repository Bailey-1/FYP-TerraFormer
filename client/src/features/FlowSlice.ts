import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addEdge,
    applyNodeChanges,
    Connection,
    Edge,
    Node,
    NodeChange,
} from 'reactflow';
import { IResourceState } from '../interfaces/IResourceState';

// Define a type for the slice state
interface CounterState {
    nodes: Node[];
    edges: Edge[];
}

// Define the initial state using that type
const initialState: CounterState = {
    nodes: [
        {
            id: Math.random().toString(),
            position: { x: 100, y: 50 },
            data: {},
            type: 'resourceNode',
        },
        {
            id: Math.random().toString(),
            position: { x: 100, y: 250 },
            data: {},
            type: 'resourceNode',
        },
    ],
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
            state.edges = addEdge(action.payload, state.edges);
        },
    },
});

export const { addNode, onNodesChange, onConnect } = flowSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default flowSlice;
