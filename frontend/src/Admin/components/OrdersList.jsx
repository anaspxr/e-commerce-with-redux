import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function OrdersList({ orders }) {
  return (
    <div className="mt-5 grid lg:grid-cols-2 gap-2">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-slate-200 flex items-center border-b justify-between p-1 px-10 rounded-sm shadow-md">
          <div>
            <p className="text-xl font-semibold">
              Customer Name :{order.userID.name}
            </p>
            <p>Order ID: {order._id}</p>
            <p className="text-gray-600">Amount: ₹{order.amount}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="text-gray-600">Date: {order.createdAt}</p>
            <div>
              <p className="text-gray-600">Products:</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product._id}>
                    <p>
                      {product.productID?.name} x {product.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              to={`/admin/orders/${order.id}`}
              className="bg-slate-500 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
              Edit <FaRegEdit />
            </Link>
            <button className="bg-red-700 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
              Delete <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
