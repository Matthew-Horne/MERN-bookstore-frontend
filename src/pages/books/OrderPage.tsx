// Define the Order type based on backend model
export interface Order {
  _id: string;
  name: string;
  email: string;
  address: {
    address?: string; // street address, optional for compatibility
    city: string;
    country?: string;
    state?: string;
    zipcode?: string;
  };
  phone: number;
  productID: string[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

import { useGetOrdersByEmailQuery } from "../../redux/features/orders/orderAPI";
import { useAuth } from "../../context/AuthContext";

export const OrderPage = () => {
  const { currentUser } = useAuth();
  const email = currentUser?.email || "";
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersByEmailQuery(email);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error getting orders</div>;
  }
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No Orders found</div>
      ) : (
        <div>
          {orders.map((order: Order, index: number) => (
            <div key={order._id} className="border-b mb-4 pb-4">
              <p className="p-1 bg-secondary text-white w-10 rounded mb-1">
                # {index + 1}
              </p>
              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p className="text-gray-600">Name: {order.name}</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <h3 className="font-semibold mt-2">Products Id:</h3>
              <ul>
                {order.productID.map((productId: string) => (
                  <li key={productId}>{productId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
