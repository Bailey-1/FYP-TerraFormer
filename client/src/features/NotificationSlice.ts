import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RandomID from '../utility/RandomID';

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
                type: INotification['type'];
                title: INotification['title'];
                message?: INotification['message'];
            }>,
        ) => {
            state.push({
                id: RandomID(),
                type: action.payload.type,
                title: action.payload.title,
                message: action.payload.message
                    ? action.payload.message
                    : undefined,
            });
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
