import { useEffect, useReducer, useState } from "react";

export default function Filter({ setDisplayProducts, products }) {
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
          onChange={(e) => setFilterOption(e.target.value)}>
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
        onClick={handleFilter}>
        Filter
      </button>
    </div>
  );
}
