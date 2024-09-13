import { useNavigate, useParams } from "react-router-dom";
import useGetPrivateData from "../../hooks/useGetPrivateData";
import OrderDetails from "./OrderDetails";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmPopUp from "../../components/ConfirmPopUp";

export default function UserDetails() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    data,
    loading: loadingUsers,
    error: errorUsers,
  } = useGetPrivateData(`admin/users/${id}`);
  const {
    data: orderDetails,
    loading: loadingOrders,
    error: errorOrders,
  } = useGetPrivateData(`admin/orders/userID/${id}`);

  const user = data?.user;

  const handleDeleteUser = async () => {
    setConfirmDelete(false);
    try {
      await axiosPrivate.delete(`/admin/users/${id}`);
      toast.success("User deleted successfully!!");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="flex flex-col gap-2 m-auto p-5 text-slate-600">
      <p className="font-semibold text-xl">User Details </p>

      {loadingUsers && <p>Loading...</p>}
      {errorUsers && <p>{errorUsers}</p>}
      {data && (
        <div className="border shadow-md rounded-md p-5 flex flex-col gap-5">
          <p className="text-lg font-semibold">Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>
            Address:
            {user.address?.flatName &&
            user.address?.city &&
            user.address?.pincode
              ? `${user.address.flatName}, ${user.address.city}, ${user.address.pincode}`
              : "User has not updated their address"}
          </p>
          <p>
            Phone:
            {user.address?.phone
              ? user.address.phone
              : "User has not updated their phone number"}
          </p>
          {/* <p>Orders: {user.orders?.length}</p> */}
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-700 text-white py-1 px-2 rounded-md hover:bg-opacity-90">
              Delete User!
            </button>
          </div>
        </div>
      )}
      <div className="mt-10">
        {loadingOrders && <p>Loading...</p>}
        {errorOrders && <p>{errorOrders}</p>}
        <p className="font-semibold text-xl">Orders</p>
        {orderDetails &&
          (orderDetails.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orderDetails.map((order) => (
              <OrderDetails key={order._id} order={order} showName={false} />
            ))
          ))}
      </div>
      {confirmDelete && (
        <ConfirmPopUp
          message="Are you sure you want to delete this user?"
          onConfirm={handleDeleteUser}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}
