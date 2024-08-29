import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy } from "../Store/cartSlice";
import LoadingAndError from "../components/LoadingAndError";
import CartItem from "../components/private/CartItem";

export default function Cart() {
  const { cartItems, fetching, error } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, product) => acc + product.productID.price * product.quantity,
    0
  );

  const oldAmount = cartItems.reduce(
    (acc, product) => acc + product.productID.oldPrice * product.quantity,
    0
  );

  function handleCheckout() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    dispatch(addToBuy(cartItems));
    navigate("/checkout");
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-900 text-center mb-10">Cart</h1>
      {<LoadingAndError loading={fetching} error={error} />}
      {!fetching && !error && cartItems?.length === 0 ? (
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
        cartItems && (
          <div className="flex flex-wrap md:flex-nowrap gap-5 justify-between">
            <div className="flex flex-col w-full md:w-3/5 gap-3">
              {cartItems.map((product) => (
                <CartItem product={product} key={product._id} />
              ))}
            </div>
            <div className="flex flex-col w-full md:w-2/5 border-2 h-fit p-5 gap-3 md:sticky top-20 ">
              <div className=" py-2">
                <p className="border-b-2 font-semibold">
                  Total items : {cartItems.length}
                </p>
                {cartItems.map((product) => (
                  <p key={product._id}>
                    {product.productID.name} x {product.quantity}
                  </p>
                ))}
              </div>
              <p className="text-2xl text-orange-900 font-semibold border-b-2">
                Amount
              </p>
              <div className="text-gray-600">
                <p>Total Price:{oldAmount}</p>
                <p>Discount:{oldAmount - totalAmount}</p>
              </div>
              <div className="flex flex-col">
                <div className="mt-5">
                  <p className="text-green-500 text-xl">
                    Total: ₹{totalAmount}{" "}
                    <span className="text-gray-400 text-base line-through">
                      ₹{oldAmount}
                    </span>
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5">
                  {currentUser ? "Checkout" : "Login to Checkout"}
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
