import useGetPrivateData from "../../hooks/useGetPrivateData";
import { Link } from "react-router-dom";

export default function Admin() {
  const { data, loading, error } = useGetPrivateData("admin/stats/count");

  return (
    <div>
      <div className="grid  md:grid-cols-2 gap-2">
        <Link
          to="/admin/users"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <p className="text-3xl mb-5">Users</p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <p className="text-2xl">{data?.users}</p>
        </Link>
        <Link
          to="/admin/products"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <p className="text-3xl mb-5">Products</p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <p className="text-2xl">{data?.products}</p>
        </Link>
        <div className="bg-slate-200 px-2 py-5 rounded-md text-slate-500">
          <p className="text-3xl mb-5">Orders</p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <p className="text-2xl">{data?.orders}</p>
        </div>
      </div>
      <div className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300 my-2">
        <p className="text-slate-900 text-2xl ">Stats</p>
      </div>
    </div>
  );
}
