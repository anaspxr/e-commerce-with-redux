import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy, addToCart, removeFromCart } from "../Store/cartSlice";
import NoItem from "../components/NoItem";

export default function Cart() {
  const { cartItems, fetching, error } = useSelector((state) => state.cart);
  return (
    <div className="p-5">
      {fetching && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!fetching && !error && cartItems?.length === 0 ? (
        <h1 className="text-3xl text-orange-900 text-center mb-10">
          Your cart is empty
        </h1>
      ) : (
        cartItems && <CartDetails cartItems={cartItems} />
      )}
    </div>
  );
}

function CartDetails({ cartItems }) {
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
    <>
      <h1 className="text-3xl text-orange-900 text-center mb-10">Cart</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {cartItems.map((product) => {
          const productDetails = product?.productID; //get populated product details in productID field
          const total = productDetails.price * product.quantity;
          const oldTotal = productDetails.oldPrice * product.quantity;
          return (
            <div key={product._id}>
              {!product ? (
                <NoItem productID={productDetails._id} />
              ) : (
                <div className="flex flex-col justify-between bg-white overflow-hidden ">
                  <img
                    className=" w-full h-60 object-cover"
                    src={productDetails.image}
                    alt={productDetails.name}
                  />

                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-xl">{productDetails.name}</h1>
                      <div className=" flex flex-wrap gap-5">
                        <span className="text-orange-500">
                          ₹{productDetails.price}
                        </span>
                        <span className="text-gray-400 line-through">
                          ₹{productDetails.oldPrice}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2 mt-2">
                        <p>Quantity: {product.quantity} </p>
                        <button
                          onClick={() => {
                            dispatch(
                              addToCart({
                                cartID: productDetails._id,
                                userID: currentUser.id,
                              })
                            );
                          }}
                          className="bg-orange-200 h-6 w-6 rounded-md hover:bg-orange-300">
                          +
                        </button>
                        <button
                          onClick={() => {
                            dispatch(
                              removeFromCart({
                                cartID: productDetails._id,
                                userID: currentUser.id,
                              })
                            );
                          }}
                          className="bg-orange-200 h-6 w-6 rounded-md hover:bg-orange-300">
                          -
                        </button>
                      </div>
                      <div className=" flex flex-wrap gap-5">
                        <span className="text-green-500">Total: ₹{total}</span>
                        <span className="text-gray-400 line-through">
                          ₹{oldTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <hr className="border-2" />
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          <p>Retail Total:{oldAmount}</p>
          <p>Discount:{oldAmount - totalAmount}</p>
          <p>Delivery Charges: ₹200</p>
          <p className="text-green-500">Total:{totalAmount + 200} </p>
        </div>

        <div className="flex flex-col">
          <div className="mt-5">
            <p className="text-green-500 text-xl">
              Total: ₹{totalAmount + 200}
            </p>
            <p className="text-gray-400 line-through">₹{oldAmount + 200} </p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5">
            {currentUser ? "Checkout" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </>
  );
}
