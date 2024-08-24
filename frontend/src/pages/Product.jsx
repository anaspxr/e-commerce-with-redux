import { useParams } from "react-router-dom";
import { RelatedProducts, Recommend } from "../components/Recommend";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy } from "../Store/cartSlice";
import { setRedirectPath } from "../Store/userSlice";
import useFetch from "../utils/useFetch";
import { addToCartUtil } from "../utils/cartUtils";
import useCartUtil from "../hooks/useCartUtil";

export default function Product() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { productID } = useParams();
  const navigate = useNavigate();
  const added = Object.keys(cartItems).includes(productID);

  const { utilFunction: addToCart, loading: cartLoading } =
    useCartUtil(addToCartUtil);

  const { data, loading, error } = useFetch(`/public/products/${productID}`);

  const product = data ? data.product : null;

  function calculateDiscountPrice(oldPrice, price) {
    return Math.floor(((oldPrice - price) / oldPrice) * 100);
  }

  function handleBuyNow(id) {
    dispatch(addToBuy({ [id]: 1 }));
    navigate("/checkout");
  }

  function handleAddToCart() {
    if (!currentUser) {
      // if user is not logged in, redirect to login page
      dispatch(setRedirectPath("/"));
      navigate("/login");
      return;
    }
    added
      ? navigate("/cart")
      : addToCart({ productID: product._id, quantity: 1 });
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!error && !loading && !product && (
        <h1 className="text-red-500 text-center text-xl ">
          Product not found!!
        </h1>
      )}
      {product && (
        <>
          <div className="p-10 ">
            <div className="flex justify-center items-center ">
              <img
                src={product.image}
                alt={product.name}
                className="h-60 md:h-96 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl text-orange-950 font-semibold">
                {product.name}
              </h1>
              <div className=" flex flex-wrap gap-5">
                <span className="text-orange-500"> ₹{product.price}</span>
                <span className="text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              </div>
              <p className="text-green-800">
                {calculateDiscountPrice(product.oldPrice, product.price)}% off
              </p>
              <p className="text-lg font-semibold text-orange-950">
                {product.description}
              </p>
            </div>
            <div className="flex justify-center gap-10 mt-5">
              <button
                onClick={() => {
                  handleBuyNow(productID);
                }}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 w-28">
                {cartLoading ? "..." : added ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          <div className="bg-orange-100 p-2 sm:p-4">
            <h1 className="text-2xl text-orange-950 font-semibold mt-10">
              Related Products
            </h1>
            <RelatedProducts product={product} />
          </div>
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl text-orange-950 font-semibold mt-10">
              You may also like..
            </h1>
            <Recommend />
          </div>
        </>
      )}
    </>
  );
}
