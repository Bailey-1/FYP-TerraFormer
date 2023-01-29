import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResourceState } from '../interfaces/IResourceState';

// Define a type for the slice state
interface CounterState {
    resources: IResourceState[];
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
            state.resources.push(action.payload);
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
                (x) => x.id === action.payload.id,
            );

            if (!resource) {
                console.error('Resource does not exist', action.payload);
                return;
            }

            const existingEl = resource.keys.find(
                (x) => x.name === action.payload.key,
            );

            if (existingEl) {
                existingEl.value = action.payload.value;
                existingEl.valid = action.payload.valid;
            } else {
                resource.keys.push({
                    name: action.payload.key,
                    value: action.payload.value,
                    valid: false,
                    // touched: false,
                });
            }
        },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

export const { addResource, updateResourceKey } = resourceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default resourceSlice;
