import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy } from "../Store/cartSlice";
import { setRedirectPath } from "../Store/userSlice";
import useCartUtil from "../hooks/useCartUtil";
import { addToCartUtil } from "../utils/cartUtils";

export default function Item({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);
  const added = cart?.some((item) => item.productID === product._id);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { utilFunction: addToCart, loading } = useCartUtil(addToCartUtil);

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

  // function handleRemoveFromCart() {
  //   dispatch(re({ productID: product._id }));
  // }

  return (
    <div className="flex flex-col  bg-white shadow-2xl overflow-hidden rounded-md border">
      <Link to={`/products/${product._id}`}>
        <img
          className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-32 lg:h-60 object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="flex flex-col justify-between h-full p-3">
        <div>
          <Link
            to={`/products/${product.id}`}
            className="sm:text-lg lg:text-xl text-orange-900 hover:text-orange-600">
            {product.name}
          </Link>
          <div className=" flex flex-wrap gap-x-5">
            <span className="text-orange-600"> ₹{product.price}</span>
            <span className="text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          </div>
          <p className="text-green-800">
            {calculateDiscountPrice(product.oldPrice, product.price)}% off
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              handleBuyNow(product.id);
            }}
            className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm">
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm">
            {loading ? ".." : added ? "Go to Cart" : "Add to Cart"}
          </button>
          {added && (
            <button
              // onClick={handleRemoveFromCart}
              className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm">
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
