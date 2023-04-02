import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ResourceListState {
    searchTerm: string;
    searchFilter: string[];
}

// Define the initial state using that type
const initialState: ResourceListState = {
    searchTerm: '',
    searchFilter: [],
};

export const resourceListSlice = createSlice({
    name: 'resourceList',
    initialState,
    reducers: {
        onSearchTermUpdate: (
            state,
            action: PayloadAction<{
                searchTerm: string;
            }>,
        ) => {
            state.searchTerm = action.payload.searchTerm;
        },
        onFilterUpdate: (
            state,
            action: PayloadAction<{
                searchFilter: string[];
            }>,
        ) => {
            state.searchFilter = action.payload.searchFilter;
        },
    },
});

export const { onSearchTermUpdate, onFilterUpdate } = resourceListSlice.actions;

export default resourceListSlice;
