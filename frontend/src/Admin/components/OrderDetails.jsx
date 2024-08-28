import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function OrderDetails({ order }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteOrder = async () => {
    setDeleteLoading(true);
    try {
      await axiosPrivate.delete(`/admin/orders/${order._id}`);
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className={`border-2 my-2 ${isDeleted ? "bg-red-100" : "bg-white"}`}>
      {isDeleted && (
        <p className="bg-red-500 text-white text-center p-2">
          Order Deleted Successfully
        </p>
      )}
      <div className="px-5 flex justify-between mt-5">
        <div>
          <p className="text-md font-semibold text-slate-700 mb-3">
            User Name: {order.userID?.name}
          </p>
          <p className="text-md font-semibold text-slate-700 mb-3">
            Order ID: {order._id}
          </p>
          <p>Order Date: {order.createdAt.substring(0, 10)}</p>
          {order.info && <p>Info: {order.info}</p>}
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p>Payment Status: {order.paymentStatus}</p>
          <p>Shipping status: {order.shippingStatus}</p>
          <button className="bg-slate-500 text-white max-w-40 px-4 py-1 rounded-md flex items-center justify-between gap-1 hover:bg-opacity-85">
            Edit Order <FaRegEdit />
          </button>
          <button
            onClick={() =>
              confirm("Are you sure you want to delete this order?") &&
              deleteOrder()
            }
            className="bg-red-700 text-white max-w-40 px-4 py-1 rounded-md flex justify-between items-center gap-1 hover:bg-opacity-85">
            {deleteLoading
              ? "Deleting.."
              : !isDeleted
              ? "Delete Order"
              : "Deleted"}{" "}
            <MdOutlineDelete />
          </button>
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
    </div>
  );
}
