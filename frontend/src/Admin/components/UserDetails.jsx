export default function UserDetails({ user }) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 border shadow-lg rounded-md w-fit m-auto p-5 text-slate-600">
      <h2 className="text-xl  font-semibold">{user.name}</h2>
      <p>{user.email}</p>
      <p>
        Address:
        {user.address?.address
          ? `${user.address.address}, ${user.address.city}, ${user.address.pincode}`
          : "User has not updated their address"}
      </p>
      <p>
        Phone:
        {user.address?.phone
          ? user.address.phone
          : "User has not updated their phone number"}
      </p>
      <p>Orders: {user.orders?.length}</p>
      <div className="flex gap-1 flex-wrap">
        <button className="bg-slate-500 text-white py-1 px-2 rounded-md hover:bg-opacity-90">
          Edit
        </button>
        <button className="bg-red-700 text-white py-1 px-2 rounded-md hover:bg-opacity-90">
          Delete User!
        </button>
      </div>
    </div>
  );
}
