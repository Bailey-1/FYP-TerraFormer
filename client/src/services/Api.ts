import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import k from '../const';

const baseQuery = fetchBaseQuery({
    baseUrl: `${k.serverHost}/api`,
    // prepareHeaders: (headers, { getState }) => {
    //     headers.set('Access-Control-Allow-Origin', '*');
    //     return headers;
    // },
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
