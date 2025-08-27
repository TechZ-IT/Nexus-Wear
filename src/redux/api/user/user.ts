// store/api/user/user.ts
import { apiSlice } from "../apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginCustomer: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/customer/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth", "customer"],
    }),

  }),
});

export const {
  useLoginCustomerMutation
} = customerApiSlice;