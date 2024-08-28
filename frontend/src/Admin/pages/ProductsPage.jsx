import useFetch from "../../utils/useFetch.js";
import { Link } from "react-router-dom";
import CategoriesFilter from "../components/CategoriesFilter.jsx";
import { useState } from "react";
import ProductDetails from "../components/ProductDetails.jsx";

export default function ProductsPage() {
  const [url, setUrl] = useState("/public/products");

  const { data, loading, error } = useFetch(url);

  const products = data?.products;

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-700 mb-3">
            Products
          </h1>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          {products && (
            <Link
              to="/admin/products/addproduct"
              className="bg-slate-500 inline-block text-white px-2 py-1 rounded-md  gap-1 hover:bg-opacity-85 min-w-32 text-center">
              Add Products
            </Link>
          )}
        </div>
        <CategoriesFilter setUrl={setUrl} />
      </div>
      {products && (
        <div className="mt-5 grid lg:grid-cols-2 gap-2">
          {products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
