import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface INotification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
}

// Define the initial state using that type
const initialState: INotification[] = [];

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        onCreateNotification: (
            state,
            action: PayloadAction<{
                notificationObj: INotification;
            }>,
        ) => {
            state.push(action.payload.notificationObj);
        },
        onRemoveNotification: (
            state,
            action: PayloadAction<{
                notificationId: string;
            }>,
        ) => {
            return state.filter((x) => x.id !== action.payload.notificationId);
        },
    },
});

export const { onCreateNotification, onRemoveNotification } =
    notificationsSlice.actions;

export default notificationsSlice;
