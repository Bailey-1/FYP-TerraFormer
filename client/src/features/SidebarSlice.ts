import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SidebarState {
    isOpen: boolean;
    resourceId: string | undefined;
    resourceType: string | undefined;
}

// Define the initial state using that type
const initialState: SidebarState = {
    isOpen: false,
    resourceId: undefined,
    resourceType: undefined,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        onSidebarUpdate: (
            state,
            action: PayloadAction<{
                isOpen: boolean;
                resourceId: string;
                resourceType: string;
            }>,
        ) => {
            state.isOpen = action.payload.isOpen;
            state.resourceId = action.payload.resourceId;
            state.resourceType = action.payload.resourceType;
        },
        onSidebarClose: (state, action: PayloadAction) => {
            state.isOpen = false;
        },
    },
});

export const { onSidebarUpdate, onSidebarClose } = sidebarSlice.actions;

export default sidebarSlice;
