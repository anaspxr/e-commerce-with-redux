import { useState } from "react";

export default function UsersList({ users, setSelectedUser }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="flex justify-end items-center gap-2">
        <button
          className="bg-slate-500 text-white rounded-md p-1 text-sm my-3 hover:bg-opacity-90"
          onClick={() => setToggle(!toggle)}>
          {toggle ? "Show Users" : "Show Admins"}
        </button>
      </div>
      <ul className="flex flex-col justify-between space-y-2">
        {users.length === 0 && <p>No results found</p>}
        {users
          .filter((user) => (toggle ? user.isAdmin : !user.isAdmin))
          .map((user) => (
            <li
              key={user._id}
              className="flex justify-between sm p-2 bg-gray-200 rounded-md">
              <div>
                <p className="text-slate-500">{user.name}</p>
                <p className="text-slate-700">{user.email}</p>
                {/* {!toggle && (
                  <p className="text-slate-600">Orders:{user.orders?.length}</p>
                )} */}
              </div>
              {!toggle && (
                <button
                  className="text-blue-500 w-40 p-1 rounded-md hover:bg-slate-300"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setSelectedUser(user);
                  }}>
                  See Details
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
