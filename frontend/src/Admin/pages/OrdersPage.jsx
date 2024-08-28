import useGetPrivateData from "../../hooks/useGetPrivateData.js";
import OrderDetails from "../components/OrderDetails.jsx";
export default function OrdersPage() {
  const { data: orders, loading, error } = useGetPrivateData("/admin/orders");

  return (
    <div>
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold text-slate-700 mb-3">Orders</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      {orders && (
        <div className="flex flex-col">
          {orders.map((order) => (
            <OrderDetails key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
