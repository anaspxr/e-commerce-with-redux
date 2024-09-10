import useGetPrivateData from "../../hooks/useGetPrivateData.js";
import UsersList from "../components/UsersList.jsx";

export default function UsersPage() {
  const {
    data,
    loading: loadingUsers,
    error: errorUsers,
  } = useGetPrivateData("admin/users");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-700">Users</h1>
      {errorUsers && <p>{errorUsers.message}</p>}
      {loadingUsers && <p>Loading...</p>}
      {data && <UsersList users={data.users} />}
    </div>
  );
}
