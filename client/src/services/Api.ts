import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:8080/api`,
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        createHcl: builder.mutation({
            query: ({ resources, edges }) => ({
                url: '/jsonToHcl',
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
