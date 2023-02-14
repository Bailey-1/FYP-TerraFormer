import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INodeState, IResourceState } from '../interfaces/IResourceState';
import resourceLookup from '../resources/ResourceLookup';
import { IResourceKeyResource } from '../interfaces/IResourceObject';

// Define a type for the slice state
interface CounterState {
    resources: INodeState[];
}

// Define the initial state using that type
const initialState: CounterState = {
    resources: [],
};

export const resourceSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        addResource: (state, action: PayloadAction<IResourceState>) => {
            console.log(action.payload);
            state.resources.push({
                id: Math.random().toString(),
                position: { x: 100, y: 50 },
                data: { state: action.payload },
            });

            // Loop through resources to check validity of the instance name
            state.resources.forEach((r) => {
                r.data.state.instance_name_valid = !(
                    state.resources.filter(
                        (x) =>
                            x.data.state.instance_name ===
                            r.data.state.instance_name,
                    ).length > 1
                );
            });
        },
        updateResourceKey: (
            state,
            action: PayloadAction<{
                id: number;
                key: string;
                value: string;
                valid: boolean;
            }>,
        ) => {
            const resource = state.resources.find(
                (x) => x.data.state.id === action.payload.id,
            );

            if (!resource) {
                console.error('Resource does not exist', action.payload);
                return;
            }

            const existingEl = resource.data.state.keys.find(
                (x) => x.name === action.payload.key,
            );

            if (existingEl) {
                existingEl.value = action.payload.value;
                existingEl.valid = action.payload.valid;
            } else {
                resource.data.state.keys.push({
                    name: action.payload.key,
                    value: action.payload.value,
                    valid: false,
                    // touched: false,
                });
            }
        },
        deleteResource: (
            state,
            action: PayloadAction<{
                id: number;
            }>,
        ) => {
            const resource = state.resources.find(
                (x) => x.data.state.id === action.payload.id,
            );

            if (!resource) {
                throw new Error(
                    `Resource is undefined. ID ${action.payload.id}`,
                );
            }

            const resourceType = resourceLookup.find(
                (x) => x.name === resource.data.state.type,
            )!;

            state.resources.forEach((r) => {
                const rtype = resourceLookup.find(
                    (x) => x.name === r.data.state.type,
                );

                if (rtype) {
                    r.data.state.keys.forEach((k) => {
                        const sameResourceTypeKey = rtype.keys.find(
                            (x) =>
                                x.name === k.name &&
                                x.type === 'resource' &&
                                x.resource_type === resourceType.name,
                        ) as IResourceKeyResource;

                        if (sameResourceTypeKey) {
                            k.value = '';
                        }
                    });
                }
            });

            state.resources = state.resources.filter(
                (x) => x.data.state.id !== action.payload.id,
            );

            // Loop through resources to check validity of the instance name
            state.resources.forEach((r) => {
                r.data.state.instance_name_valid = !(
                    state.resources.filter(
                        (x) =>
                            x.data.state.instance_name ===
                            r.data.state.instance_name,
                    ).length > 1
                );
            });
        },
        updateResourceInstanceName: (
            state,
            action: PayloadAction<{
                id: number;
                name: string;
            }>,
        ) => {
            const resource = state.resources.find(
                (x) => x.data.state.id === action.payload.id,
            );

            if (resource) {
                resource.data.state.instance_name = action.payload.name;
            }

            // Loop through resources to check validity of the instance name
            state.resources.forEach((r) => {
                r.data.state.instance_name_valid = !(
                    state.resources.filter(
                        (x) =>
                            x.data.state.instance_name ===
                            r.data.state.instance_name,
                    ).length > 1
                );
            });
        },
    },
});

export const {
    addResource,
    updateResourceKey,
    deleteResource,
    updateResourceInstanceName,
} = resourceSlice.actions;

export default resourceSlice;
