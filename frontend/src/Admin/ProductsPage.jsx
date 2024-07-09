import { useEffect, useReducer, useState } from "react";
import useFetch from "../utils/useFetch";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SearchField from "../components/SearchField";
import getSearchResults from "../utils/getSearchResults";
import { handleDelete } from "../utils/serverUtils";
export default function ProductsPage() {
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/products");

  const navigate = useNavigate();
  const [displayProducts, setDisplayProducts] = useState(products);

  function handleSearch(value) {
    setDisplayProducts(getSearchResults(products, value, ["name", "category"]));
  }
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
              className="bg-slate-500 inline-block text-white px-2 py-1 rounded-md  gap-1 hover:bg-opacity-85 min-w-32 text-center"
            >
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
            <Filter
              setDisplayProducts={setDisplayProducts}
              products={products}
            />
          </div>
        )}
      </div>
      {displayProducts && (
        <div className="mt-5 grid lg:grid-cols-2 gap-2">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-200 flex items-center border-b justify-between p-1 px-10 rounded-sm shadow-md"
            >
              <div>
                <p className="text-xl font-semibold">{product.name}</p>
                <img
                  src={product.image}
                  alt="product image"
                  className="h-16 object-cover w-28 rounded-sm"
                />
                <p className="text-gray-600">Price: {product.discountPrice}</p>
                <p className="text-gray-500">Old Price: {product.oldPrice} </p>
                <p className="text-gray-600">Category: {product.category} </p>
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  to={`/admin/products/${product.id}`}
                  className="bg-slate-500 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85"
                >
                  Edit <FaRegEdit />
                </Link>
                <button
                  onClick={() => {
                    window.confirm(
                      "Are you sure you want to delete this item?"
                    ) &&
                      handleDelete(product.id, "products") &&
                      setDisplayProducts((prev) =>
                        prev.filter((p) => p.id !== product.id)
                      );
                  }}
                  className="bg-red-700 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85"
                >
                  Delete <MdOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Filter({ setDisplayProducts, products }) {
  const [filterOption, setFilterOption] = useState("all");
  const [results, setResults] = useReducer(reducer, null);
  useEffect(() => {
    setResults({ type: "price", payload: 0 });
  }, [products]);

  function reducer(_, action) {
    if (action.type === "category") {
      if (action.payload === "all" || action.payload === "") return products;
      return products.filter((product) => product.category === action.payload);
    } else return products;
  }
  function handleFilter() {
    console.log(filterOption);
    setResults({ type: "category", payload: filterOption });
  }

  useEffect(() => {
    setDisplayProducts(results);
  }, [results, setDisplayProducts]);

  return (
    <div className="max-w-48 bg-slate-200 shadow-xl border p-2 rounded-md mt-5 w-60 text-sm">
      <div className="mb-1">
        <label htmlFor="category">Category: </label>
        <select
          className="rounded-md"
          name="category"
          id="category"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="">All</option>
          <option value="homedecor">Home Decor</option>
          <option value="sofas">Sofas</option>
          <option value="mattresses">Mattresses</option>
          <option value="dining">Dining</option>
          <option value="lightings">Lightings</option>
          <option value="furnishings">Furnishings</option>
        </select>
      </div>
      <button
        className="bg-slate-500 text-white p-1 px-3 rounded-md w-full hover:bg-opacity-80"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
}
