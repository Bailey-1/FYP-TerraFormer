import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import k from '../const';

const baseQuery = fetchBaseQuery({
    baseUrl: `${k.serverHost}/api`,
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        createHcl: builder.mutation({
            query: ({ resources, edges }) => ({
                url: '/generateHcl',
                method: 'POST',
                body: {
                    resources,
                    edges,
                },
            }),
        }),
    }),
});

export const { useCreateHclMutation } = baseApi;

export default baseApi;
