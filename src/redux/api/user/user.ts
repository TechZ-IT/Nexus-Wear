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
    registerCustomer: builder.mutation({
      query: (credentials: { name:string, email: string; password: string }) => ({
        url: "/customer",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth", "customer"],
    }),

  }),
});

export const {
  useLoginCustomerMutation,
  useRegisterCustomerMutation
} = customerApiSlice;