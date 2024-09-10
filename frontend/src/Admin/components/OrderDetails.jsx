import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function OrderDetails({ order }) {
  const [showDetails, setShowDetails] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [editOpen, setEditOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.shippingStatus);

  const handleStatusChange = async () => {
    try {
      const { data } = await axiosPrivate.patch(`/admin/orders/${order._id}`, {
        shippingStatus: orderStatus,
      });
      console.log(data.shippingStatus);

      setOrderStatus(data.shippingStatus);
      setEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 my-2 ">
      <div className="px-5 flex justify-between mt-5">
        <div>
          <p className="text-md font-semibold text-slate-700 mb-3">
            User Name: {order.userID?.name}
          </p>
          <p className="text-md font-semibold text-slate-700 mb-3">
            Order ID: {order._id}
          </p>
          {order.info && <p>Info: {order.info}</p>}
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p>Payment Status: {order.paymentStatus}</p>
          <p>
            Shipping status:{"   "}
            {editOpen ? (
              <select
                className="border-2 border-slate-500 rounded-md cursor-pointer"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              orderStatus
            )}
          </p>
          {editOpen ? (
            <div className="flex gap-2">
              <button
                onClick={handleStatusChange}
                className="bg-yellow-500 text-white max-w-40 px-4 py-1 mb-2 rounded-md flex items-center justify-between gap-1 hover:bg-opacity-85 ">
                Update Status
              </button>
              <button
                onClick={() => setEditOpen(!editOpen)}
                className="bg-red-500 text-white max-w-40 px-4 py-1 mb-2 rounded-md flex items-center justify-between gap-1 hover:bg-opacity-85 ">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditOpen(!editOpen)}
              className="bg-blue-800 text-white max-w-40 px-4 py-1 mb-2 rounded-md flex items-center justify-between gap-1 hover:bg-opacity-85 ">
              Edit Status <FaRegEdit />
            </button>
          )}
        </div>
      </div>
      <table className="border shadow-md  border-collapse w-full text-sm text-left rtl:text-right">
        <thead className="border">
          <tr
            className="border-b-2 hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? (
              <>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Unit Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3"> Amount</th>
              </>
            ) : (
              <>
                <th className="px-6 py-3">Items x {order.products.length}</th>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3 flex gap-1 items-center">
                  Show items details <HiChevronDown />{" "}
                </th>
              </>
            )}
          </tr>
        </thead>
        {showDetails && (
          <tbody>
            {order.products.map((product) => (
              <tr key={product._id} className="border">
                <td className="px-6 py-3">
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
        )}
        <tfoot>
          <tr>
            <td className="px-6 py-3">
              <p className="text-nowrap">
                Order Date: {order.createdAt.substring(0, 10)}
              </p>
            </td>
            <td className="px-6 py-3"></td>
            <th>Total Amount:</th>
            <td className="px-6 py-3 text-lg">{order.amount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
