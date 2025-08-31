"use client"
import useAuthState from "@/hooks/useAuthState";
import { useGetCustomerByIdQuery } from "@/redux/api/user/user";

export default function CustomerPage() {
  const user = useAuthState();
  const id = user?.id;
  
  // Skip the query if id is not available
  const { data: customer, isLoading, error, isError } = useGetCustomerByIdQuery(id || '');
  console.log(customer)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {`${error} || 'Failed to load customer data'`}</div>;
  }

  return (
    <div>
      {customer ? (
        <div>
          <h1>Customer Details</h1>
          <p>Name: {customer.name}</p>
          <p>Email: {customer.email}</p>
        </div>
      ) : (
        <div>No customer data found</div>
      )}
    </div>
  );
}