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
import {
    IResourceKeyState,
    IResourceState,
} from '../interfaces/IResourceState';
import ResourceLookup from '../resources/ResourceLookup';
import { IResourceKeys, IResourceObject } from '../interfaces/IResourceObject';
import { ISubResourceState } from '../interfaces/ISubResourceState';
import { ISubResourceObject } from '../interfaces/ISubResourceObject';

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
            action: PayloadAction<{
                name: string;
                position: XYPosition;
            }>,
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
                            )
                                ?.keys.filter((x) => x.required)
                                .map((key: IResourceKeys) => {
                                    if (key.type === 'resource') {
                                        return {
                                            id: Math.random().toString(),
                                            name: key.name,
                                            value: '',
                                            valid: false,
                                            type: 'resource',
                                        };
                                    } else {
                                        return {
                                            id: Math.random().toString(),
                                            name: key.name,
                                            value: '',
                                            valid: false,
                                            type: key.type,
                                        };
                                    }
                                }) || [],
                    } as IResourceState,
                },
                type: 'resourceNode',
            });
        },
        addSubNode: (
            state,
            action: PayloadAction<{
                name: string;
                position: XYPosition;
                parentResourceNode: IResourceObject;
                subResource: ISubResourceObject;
            }>,
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
                        parent_type: action.payload.parentResourceNode.name,
                        keys:
                            action.payload.subResource.keys
                                .filter((x) => x.required)
                                .map((key: any) => {
                                    return {
                                        id: Math.random().toString(),
                                        name: key.name,
                                        value: '',
                                        valid: false,
                                    };
                                }) || [],
                    } as ISubResourceState,
                },
                type: 'subResourceNode',
            });
        },
        onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
            action.payload.forEach((payload) => {
                // Remove edges from redux when linked node is deleted
                if (payload.type === 'remove') {
                    state.edges = state.edges.filter(
                        (x) =>
                            x.source !== payload.id && x.target !== payload.id,
                    );
                }
            });

            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        onConnect: (state, action: PayloadAction<Connection>) => {
            // Check node is different from self
            if (action.payload.source !== action.payload.target) {
                const srcNode = state.nodes.find(
                    (x) => x.id === action.payload.source,
                );

                const type =
                    srcNode?.type === 'resourceNode' ? 'selectEdge' : 'default';

                state.edges = addEdge(
                    {
                        ...action.payload,
                        type,
                        data: { connection: action.payload, value: '' },
                    },
                    state.edges,
                );
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
        onEdgesDataUpdate: (
            state,
            action: PayloadAction<{
                edgeId: string;
                data: string;
            }>,
        ) => {
            const target = state.edges.find(
                (x) => x.id === action.payload.edgeId,
            );

            if (target) {
                target.data.value = action.payload.data;
            }
        },
        addNewNodeKey: (
            state,
            action: PayloadAction<{
                nodeId: string;
                keyName: string;
                keyType: string;
            }>,
        ) => {
            const node = state.nodes.find(
                (x) => x.id === action.payload.nodeId,
            );

            const ref = {
                id: Math.random().toString(),
                name: action.payload.keyName,
                // instance_name: '',
                // resource_key: '',
                // resource_type: '',
                type: action.payload.keyType,
            };

            node?.data.resourceState.keys.push(ref);
        },
    },
});

export const {
    addNode,
    addSubNode,
    onNodesChange,
    onConnect,
    updateNodeKey,
    onEdgesChange,
    onEdgesUpdate,
    onEdgesDataUpdate,
    addNewNodeKey,
} = flowSlice.actions;

export default flowSlice;
