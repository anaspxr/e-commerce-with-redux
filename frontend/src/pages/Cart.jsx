import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy, addToCart, removeFromCart } from "../Store/cartSlice";
import NoItem from "../components/NoItem";

export default function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const { products, loading, error } = useContext(ProductContext);
  const navigate = useNavigate();
  const totalAmount = Object.keys(cart).reduce((acc, productID) => {
    const product = products?.find((item) => item.id === productID);
    return acc + Number(product?.discountPrice) * Number(cart[productID]);
  }, 0);
  const oldAmount = Object.keys(cart).reduce((acc, productID) => {
    const product = products?.find((item) => item.id === productID);
    return acc + Number(product?.oldPrice) * Number(cart[productID]);
  }, 0);

  function handleCheckout() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    dispatch(addToBuy(cart));
    navigate("/checkout");
  }

  return (
    <div className="p-5">
      {Object.keys(cart).length === 0 ? (
        <h1 className="text-3xl text-orange-900 text-center mb-10">
          Your cart is empty
        </h1>
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {products && (
            <>
              <h1 className="text-3xl text-orange-900 text-center mb-10">
                Cart
              </h1>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
                {Object.keys(cart).map((productID) => {
                  const product = products.find(
                    (item) => item.id === productID
                  );
                  const total = product?.discountPrice * cart[productID];
                  const oldTotal = product?.oldPrice * cart[productID];
                  return (
                    <div key={productID}>
                      {!product ? (
                        <NoItem productID={productID} />
                      ) : (
                        <div
                          key={productID}
                          className="flex flex-col justify-between bg-white overflow-hidden "
                        >
                          <img
                            className=" w-full h-60 object-cover"
                            src={product.image}
                            alt={product.name}
                          />

                          <div className="flex justify-between">
                            <div>
                              <h1 className="text-xl">{product.name}</h1>
                              <div className=" flex flex-wrap gap-5">
                                <span className="text-orange-500">
                                  ₹{product.discountPrice}
                                </span>
                                <span className="text-gray-400 line-through">
                                  ₹{product.oldPrice}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="flex gap-2 mt-2">
                                <p>Quantity: {cart[productID]} </p>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      addToCart({
                                        cartID: productID,
                                        userID: currentUser.id,
                                      })
                                    );
                                  }}
                                  className="bg-orange-200 h-6 w-6 rounded-md hover:bg-orange-300"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      removeFromCart({
                                        cartID: productID,
                                        userID: currentUser.id,
                                      })
                                    );
                                  }}
                                  className="bg-orange-200 h-6 w-6 rounded-md hover:bg-orange-300"
                                >
                                  -
                                </button>
                              </div>
                              <div className=" flex flex-wrap gap-5">
                                <span className="text-green-500">
                                  Total: ₹{total}
                                </span>
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
                    <p className="text-gray-400 line-through">₹{oldAmount} </p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5"
                  >
                    {currentUser ? "Checkout" : "Login to Checkout"}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
