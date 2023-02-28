import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SettingsState {
    additionalDetails: boolean;
}

// Define the initial state using that type
const initialState: SettingsState = {
    additionalDetails: false,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        onAdditionalSettingsUpdate: (
            state,
            action: PayloadAction<{
                additionalDetails: boolean;
            }>,
        ) => {
            state.additionalDetails = action.payload.additionalDetails;
        },
    },
});

export const { onAdditionalSettingsUpdate } = settingsSlice.actions;

export default settingsSlice;
