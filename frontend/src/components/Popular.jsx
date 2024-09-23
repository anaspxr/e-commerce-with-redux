import useFetch from "../utils/useFetch";
import Item from "./Item";
import ItemSkeleton from "./ItemSkeleton";
import LoadingAndError from "./LoadingAndError";

export default function Popular() {
  const {
    data: newProducts,
    loading,
    error,
  } = useFetch("public/products?new=true&limit=6");
  return (
    <div className="p-2 sm:p-3 lg:p-5 pb-10 bg-amber-100">
      <h2 className="md:text-4xl text-3xl text-orange-900 py-5 text-center">
        New Arrivals
      </h2>
      <LoadingAndError loading={loading} error={error} />
      {newProducts?.products ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {newProducts.products.map((item) => (
            <Item key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {Array(3)
            .fill()
            .map((_, i) => (
              <ItemSkeleton key={i} />
            ))}
        </div>
      )}
    </div>
  );
}
