import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
    resources: any[];
}

// Define the initial state using that type
const initialState: CounterState = {
    resources: [],
};

export const resourceSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        addResource: (state, action: PayloadAction<any>) => {
            state.resources.push(action.payload);
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

export const { addResource } = resourceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default resourceSlice;
