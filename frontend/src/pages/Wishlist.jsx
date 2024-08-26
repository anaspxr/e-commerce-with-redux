import { Link } from "react-router-dom";
import useGetPrivateData from "../hooks/useGetPrivateData";
import Item from "../components/Item";

export default function Wishlist() {
  const { data, loading, error } = useGetPrivateData(
    "/user/wishlist/populated"
  );

  const wishlist = data?.products;

  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-900 text-center mb-10">Cart</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && wishlist?.length === 0 ? (
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-xl text-orange-900 text-center mb-10">
            Your cart is empty..!!
          </h1>
          <Link
            to="/products"
            className="bg-orange-600 text-white p-2 rounded-md hover:opacity-90">
            Explore Products
          </Link>
        </div>
      ) : (
        wishlist && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 p-2 sm:p-3 lg:p-5">
            {wishlist.map((item) => (
              <Item key={item._id} product={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
