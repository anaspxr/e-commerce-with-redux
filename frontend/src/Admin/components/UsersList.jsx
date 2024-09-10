import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersList({ users }) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end items-center gap-2">
        <button
          className="bg-slate-500 text-white rounded-md p-1 text-sm my-3 hover:bg-opacity-90"
          onClick={() => setToggle(!toggle)}>
          {toggle ? "Show Users" : "Show Admins"}
        </button>
      </div>
      <table className="min-w-full border-collapse border-2 bg-white">
        <thead>
          <tr>
            <th className="p-2 text-left text-slate-500">Index</th>
            <th className="p-2 text-left text-slate-500">Name</th>
            <th className="p-2 text-left text-slate-500">Email</th>
            {!toggle && <th className="p-2 text-left text-slate-500"></th>}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="p-2 text-center text-slate-500">
                No results found
              </td>
            </tr>
          )}
          {users
            .filter((user) => (toggle ? user.isAdmin : !user.isAdmin))
            .map((user, i) => (
              <tr key={user._id} className="border ">
                <td className="p-2 py-4 text-slate-700">{i + 1}</td>
                <td className="p-2 text-slate-700">{user.name}</td>
                <td className="p-2 text-slate-700">{user.email}</td>
                {!toggle && (
                  <td className="p-2">
                    <button
                      className="text-blue-500 w-40 p-1 rounded-md hover:bg-slate-300"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/admin/users/${user._id}`);
                      }}>
                      See Details
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
