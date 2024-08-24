import useFetch from "../utils/useFetch";
import Item from "./Item";

export default function Popular() {
  const {
    data: popularProducts,
    loading,
    error,
  } = useFetch("public/products/popular");

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
            <Item key={item.product._id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
}
