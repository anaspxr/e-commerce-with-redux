import { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch.js";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "../../components/SearchField.jsx";
import getSearchResults from "../../utils/getSearchResults.js";
import ProductsList from "../components/ProductsList.jsx";
export default function ProductsPage() {
  const { data, loading, error } = useFetch("/public/products");

  const products = data?.products;

  const navigate = useNavigate();
  const [displayProducts, setDisplayProducts] = useState(products);

  function handleSearch(value) {
    setDisplayProducts(getSearchResults(products, value, ["name", "category"]));
  }

  useEffect(() => {
    setDisplayProducts(products || []);
  }, [products]);

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
        {products && (
          <div className="flex items-end justify-end flex-wrap">
            <SearchField
              searchData={products}
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
      {displayProducts && <ProductsList products={displayProducts} />}
    </div>
  );
}
