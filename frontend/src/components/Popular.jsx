import { useContext } from "react";
import Item from "./Item";
import { ProductContext } from "../contexts/ProductContext";

export default function Popular() {
  const { products, loading, error } = useContext(ProductContext) || [];
  const popularProducts = products
    ? [
        products[3],
        products[8],
        products[10],
        products[12],
        products[14],
        products[26],
      ]
    : null;
  return (
    <div className="p-2 sm:p-3 lg:p-5 pb-10 bg-amber-100">
      <h2 className="md:text-4xl text-3xl text-orange-900 py-5 text-center">
        Popular Products
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {popularProducts && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {popularProducts.map((item) => (
            <Item key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
