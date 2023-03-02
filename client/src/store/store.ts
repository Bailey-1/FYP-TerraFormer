import { configureStore } from '@reduxjs/toolkit';
import flowSlice from '../features/FlowSlice';
import sidebarSlice from '../features/SidebarSlice';
import settingsSlice from '../features/SettingsSlice';
import baseApi from '../services/Api';

export const store = configureStore({
    reducer: {
        flow: flowSlice.reducer,
        sidebar: sidebarSlice.reducer,
        settings: settingsSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,
            // logger,
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
