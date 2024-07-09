import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";

export default function Admin() {
  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch("http://localhost:3000/users");
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch("http://localhost:3000/products");

  const totalOrders =
    users &&
    users.reduce((total, user) => total + Object.keys(user.orders).length, 0);

  return (
    <div>
      <div className="grid  md:grid-cols-2 gap-2">
        <Link
          to="/admin/users"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300"
        >
          <p className="text-3xl mb-5">Users</p>
          {loadingUsers && <p>Loading...</p>}
          {errorUsers && <p>Error: {errorUsers.message}</p>}
          <p className="text-2xl">{users && users.length}</p>
        </Link>
        <Link
          to="/admin/products"
          className="bg-slate-200 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300"
        >
          <p className="text-3xl mb-5">Products</p>
          {loadingProducts && <p>Loading...</p>}
          {errorProducts && <p>Error: {errorProducts.message}</p>}
          <p className="text-2xl">{products && products.length}</p>
        </Link>
        <div className="bg-slate-200 px-2 py-5 rounded-md text-slate-500">
          <p className="text-3xl mb-5">Total Orders</p>
          {loadingProducts && <p>Loading...</p>}
          {errorProducts && <p>Error: {errorProducts.message}</p>}
          <p className="text-2xl">{products && totalOrders}</p>
        </div>
      </div>
    </div>
  );
}
