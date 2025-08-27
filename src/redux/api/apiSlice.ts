// store/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    // You can add auth headers here if needed
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["auth", "customer"],
  endpoints: () => ({}),
});