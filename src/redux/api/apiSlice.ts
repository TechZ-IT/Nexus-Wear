// store/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers: Headers, { getState }) => {
    const state = getState() as AppState;
    const authState = state?.auth;

    if (authState?.token) {
      console.log(authState.token);
      headers.set("Authorization", `Bearer ${authState?.token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["auth", "customer"],
  endpoints: () => ({}),
});
