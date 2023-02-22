import { configureStore } from '@reduxjs/toolkit';
import resourceSlice from '../features/ResourceSlice';
import flowSlice from '../features/FlowSlice';
import sidebarSlice from '../features/SidebarSlice';
import settingsSlice from '../features/SettingsSlice';

export const store = configureStore({
    reducer: {
        resources: resourceSlice.reducer,
        flow: flowSlice.reducer,
        sidebar: sidebarSlice.reducer,
        settings: settingsSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
