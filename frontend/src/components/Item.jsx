import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy, setWishlist } from "../Store/cartSlice";
import { setRedirectPath } from "../Store/userSlice";
import useCartUtil from "../hooks/useCartUtil";
import { addToCartUtil, removeFromCartUtil } from "../utils/cartUtils";
import { SyncLoader } from "react-spinners";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IoMdHeart, IoMdHeartEmpty, IoMdShareAlt } from "react-icons/io";
import { toast } from "react-toastify";

export default function Item({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.cart.wishlist);
  const added = cart?.some((item) => item.productID?._id === product._id);

  const inWishList = wishlist?.includes(product._id);

  const axiosPrivate = useAxiosPrivate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const { utilFunction: addToCart, loading } = useCartUtil(addToCartUtil);
  const { utilFunction: removeFromCart, loading: loadingRemove } =
    useCartUtil(removeFromCartUtil);

  function calculateDiscountPrice(oldPrice, price) {
    return Math.floor(((oldPrice - price) / oldPrice) * 100);
  }

  function handleBuyNow() {
    dispatch(addToBuy([{ productID: product, quantity: 1 }])); //this is the structure of buyItems
    navigate("/checkout");
  }

  function handleAddToCart() {
    if (!currentUser) {
      // if user is not logged in, redirect to login page
      dispatch(setRedirectPath("/"));
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    added
      ? navigate("/cart")
      : addToCart({ productID: product._id, quantity: 1 });
  }

  async function addToWishlist() {
    if (!currentUser) {
      dispatch(setRedirectPath("/"));
      navigate("/login");
      return;
    }
    try {
      const { data } = await axiosPrivate.post(`/user/wishlist`, {
        productID: product._id,
      });
      toast.error("Please login to add items to wishlist");
      dispatch(setWishlist(data.products));
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  }

  async function removeFromWishlist() {
    if (!currentUser) {
      dispatch(setRedirectPath("/"));
      toast.error("Please login");
      navigate("/login");
      return;
    }
    try {
      const { data } = await axiosPrivate.delete(`/user/wishlist`, {
        data: { productID: product._id },
      });
      dispatch(setWishlist(data.products));
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  }

  return (
    <div className="flex flex-col  bg-white shadow-2xl overflow-hidden rounded-md border">
      <Link to={`/products/${product._id}`}>
        <img
          className="top-0 left-0 transition-transform duration-500 hover:scale-105 w-full h-32 lg:h-60 object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="flex justify-between">
        <div className="flex flex-col justify-between h-full p-3">
          <div>
            <div className="flex justify-between items-center">
              <Link
                to={`/products/${product._id}`}
                className="sm:text-lg  lg:text-xl text-orange-900 hover:text-orange-600">
                {product.name}
              </Link>
            </div>
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
              onClick={handleBuyNow}
              className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm w-24">
              {loading ? (
                <SyncLoader color="white" size={5} />
              ) : added ? (
                "Go to Cart"
              ) : (
                "Add to Cart"
              )}
            </button>
            {added && (
              <button
                onClick={() => {
                  removeFromCart({ productID: product._id });
                }}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 text-xs sm:text-sm">
                {loadingRemove ? (
                  <SyncLoader color="white" size={5} />
                ) : (
                  "Remove from Cart"
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 m-3">
          {!inWishList ? (
            <button onClick={addToWishlist} title="Add to Wishlist">
              <IoMdHeartEmpty className="text-2xl md:text-3xl text-red-700 z-20 hover:text-red-500" />
            </button>
          ) : (
            <button onClick={removeFromWishlist}>
              <IoMdHeart className="text-2xl md:text-3xl text-red-500 z-20  " />
            </button>
          )}
          <button
            onClick={() => {
              toast.success("Link copied to clipboard!");
              navigator.clipboard.writeText(
                `http://localhost:5173/products/${product._id}`
              );
            }}
            title="Share">
            <IoMdShareAlt className="text-2xl md:text-3xl text-orange-700 z-20 hover:text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
