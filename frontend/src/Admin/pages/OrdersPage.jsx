import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "../../components/SearchField.jsx";
import getSearchResults from "../../utils/getSearchResults.js";
import useGetPrivateData from "../../hooks/useGetPrivateData.js";
import OrdersList from "../components/OrdersList.jsx";
export default function OrdersPage() {
  const { data: orders, loading, error } = useGetPrivateData("/admin/orders");

  const navigate = useNavigate();
  const [displayOrders, setDisplayOrders] = useState(orders);

  function handleSearch(value) {
    setDisplayOrders(getSearchResults(orders, value, ["name", "category"]));
  }

  useEffect(() => {
    setDisplayOrders(orders || []);
  }, [orders]);

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-700 mb-3">
            Products
          </h1>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {orders && (
            <Link
              to="/admin/products/addproduct"
              className="bg-slate-500 inline-block text-white px-2 py-1 rounded-md  gap-1 hover:bg-opacity-85 min-w-32 text-center">
              Add Products
            </Link>
          )}
        </div>
        {orders && (
          <div className="flex items-end justify-end flex-wrap">
            <SearchField
              searchData={orders}
              searchItems={["name", "category"]}
              handleSearch={handleSearch}
              handleClick={(product) => {
                navigate(`/admin/products/${product.id}`);
              }}
            />
            {/* <Filter
              setDisplayProducts={setDisplayProducts}
              products={products}
            /> */}
          </div>
        )}
      </div>
      {displayOrders && <OrdersList orders={displayOrders} />}
    </div>
  );
}
