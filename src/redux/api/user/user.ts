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
      query: (credentials: { name: string; email: string; password: string }) => ({
        url: "/customer",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth", "customer"],
    }),
    getCustomerById: builder.query({
      query: (id: string) => ({
        url: `/customer/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "customer", id }],
    }),
  }),
});

export const {
  useLoginCustomerMutation,
  useRegisterCustomerMutation,
  useGetCustomerByIdQuery,
} = customerApiSlice;