import { useState } from "react";

import useGetPrivateData from "../../hooks/useGetPrivateData.js";
import UsersList from "../components/UsersList.jsx";
import UserDetails from "../components/UserDetails.jsx";

export default function UsersPage() {
  const {
    data,
    loading: loadingUsers,
    error: errorUsers,
  } = useGetPrivateData("admin/users");

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-700">Users</h1>
      {selectedUser && <UserDetails user={selectedUser} />}
      {errorUsers && <p>{errorUsers.message}</p>}
      {loadingUsers && <p>Loading...</p>}
      {data && (
        <UsersList users={data.users} setSelectedUser={setSelectedUser} />
      )}
    </div>
  );
}
