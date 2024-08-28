import useGetPrivateData from "../../hooks/useGetPrivateData";
import { Link } from "react-router-dom";

export default function Admin() {
  const { data, loading, error } = useGetPrivateData("admin/stats/count");

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <Link
          to="/admin/users"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-2xl">Users</p>
            <p className="text-2xl">{data?.users}</p>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Link>
        <Link
          to="/admin/products"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-2xl">Products</p>
            <p className="text-2xl">{data?.products}</p>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Link>
        <Link
          to="/admin/orders"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-2xl">Orders</p>
            <p className="text-2xl">{data?.orders}</p>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Link>
      </div>
      <div className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 my-2">
        <p className="text-xl">Monthly Users</p>
      </div>
    </div>
  );
}
