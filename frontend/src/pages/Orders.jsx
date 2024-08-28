import LoadingAndError from "../components/LoadingAndError";
import useGetPrivateData from "../hooks/useGetPrivateData";

export default function Orders() {
  const { data, loading, error } = useGetPrivateData("/user/orders");

  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-900 text-center mb-10">Orders</h1>
      <LoadingAndError loading={loading} error={error} />
      {data && (
        <div className="flex flex-col">
          {data.map((order) => (
            <table
              key={order._id}
              className="border shadow-md border-collapse w-full text-sm text-left rtl:text-right mb-5">
              <thead className="border">
                <tr className="border-b-2">
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Unit Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3"> Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product._id} className="border">
                    <td className="px-6 py-3">
                      <img
                        src={product.productID?.image}
                        alt={product.productID?.name}
                        className="w-20 h-20 object-cover p-1"
                      />
                      <p>{product.productID?.name}</p>
                    </td>
                    <td className="px-6 py-3"> ₹{product.productID?.price}</td>
                    <td className="px-6 py-3"> {product.quantity}</td>
                    <td className="px-6 py-3">
                      {product.quantity * product.productID?.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-6 py-3">
                    Order Date: {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-3">Order status: {order.status}</td>
                  <th>Total Amount:</th>
                  <td className="px-6 py-3 text-lg">{order.amount}</td>
                </tr>
              </tfoot>
            </table>
          ))}
        </div>
      )}
    </div>
  );
}
