import { useParams } from "react-router-dom";
import { RelatedProducts, Recommend } from "../components/Recommend";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy, setWishlist } from "../Store/cartSlice";
import { setRedirectPath } from "../Store/userSlice";
import useFetch from "../utils/useFetch";
import { addToCartUtil, removeFromCartUtil } from "../utils/cartUtils";
import useCartUtil from "../hooks/useCartUtil";
import { SyncLoader } from "react-spinners";
import { IoMdHeart, IoMdHeartEmpty, IoMdShareAlt } from "react-icons/io";
import { axiosPrivate } from "../utils/axios";
import { toast } from "react-toastify";

export default function Product() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.cart.wishlist);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { productID } = useParams();
  const navigate = useNavigate();

  const { utilFunction: addToCart, loading: cartLoading } =
    useCartUtil(addToCartUtil);

  const { utilFunction: removeFromCart, loading: cartLoadingRemove } =
    useCartUtil(removeFromCartUtil);

  const { data, loading, error } = useFetch(`/public/products/${productID}`);
  const product = data ? data.product : null;

  const added = cartItems?.some((item) => item.productID?._id === product?._id);
  const inWishList = wishlist?.includes(product?._id);

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
      toast.error("Please login to add items to wishlist");
      navigate("/login");
      return;
    }
    try {
      const { data } = await axiosPrivate.post(`/user/wishlist`, {
        productID: product._id,
      });
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
            <div className="flex justify-center relative left-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-60 md:h-96 object-cover"
              />
              <div className="flex flex-col items-start justify-start h-max gap-1 relative left-3">
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
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  title="Share">
                  <IoMdShareAlt className="text-2xl md:text-3xl text-orange-700 z-20 hover:text-orange-500" />
                </button>
              </div>
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
                onClick={handleBuyNow}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300 w-28">
                {cartLoading ? (
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
                  className="bg-orange-700 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
                  {cartLoadingRemove ? (
                    <SyncLoader color="white" size={5} />
                  ) : (
                    "Remove from Cart"
                  )}
                </button>
              )}
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
