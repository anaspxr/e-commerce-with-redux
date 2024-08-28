import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosErrorCatch from "../utils/axiosErrorCatch";
import { toast } from "react-toastify";
import LoadingAndError from "../components/LoadingAndError";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setWholeCart } from "../Store/cartSlice";

export default function OrderSuccess() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const { session_id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session_id) {
      const updateOrder = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data } = await axiosPrivate.post("user/checkout/success", {
            session_id,
          });
          toast.success("Order placed successfully");
          setOrder(data.updatedOrder);
          data?.updatedCart &&
            dispatch(setWholeCart(data.updatedCart.products));
        } catch (err) {
          toast.error(axiosErrorCatch(err));
        } finally {
          setLoading(false);
        }
      };
      updateOrder();
    }
  }, [axiosPrivate, dispatch, session_id]);

  return (
    <div className="p-5">
      <LoadingAndError loading={loading} error={error} />
      <p className="text-green-600 text-center mb-10">Order placed!!</p>
      <p className="text-orange-600 text-center text-xl">Order Details</p>
      {order && (
        <>
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
                  <p>Order Date: {order.createdAt.substring(0, 10)}</p>
                  <p>Payment Status: {order.paymentStatus}</p>
                  <p>Order status: {order.shippingStatus}</p>
                </td>
                <td className="px-6 py-3"></td>
                <th>Total Amount:</th>
                <td className="px-6 py-3 text-lg">{order.amount}</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
}
