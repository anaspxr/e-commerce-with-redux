import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Address from "../components/Address";
import { ProductContext } from "../contexts/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { clearBuy, clearCart } from "../Store/cartSlice";
import CheckOutItems from "../components/private/CheckOutItems.jsx";
import CheckOutPayment from "../components/private/CheckOutPayment.jsx";

export default function Checkout() {
  useEffect(() => {
    if (buyItems.length === 0) {
      navigate("/cart");
    }
  });
  const { buyItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useContext(ProductContext);
  const [progress, setProgress] = useState("items");
  const totalAmount = buyItems.reduce(
    (acc, product) => acc + product.productID.price * product.quantity,
    0
  );

  const oldAmount = buyItems.reduce(
    (acc, product) => acc + product.productID.oldPrice * product.quantity,
    0
  );

  return (
    <div className="text-orange-800 p-5">
      <h1 className="text-2xl text-center text-orange-900 my-5">Checkout</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {products && (
        <>
          <div className="max-w-3xl m-auto">
            <IoMdArrowRoundBack
              onClick={() => {
                if (progress === "address") {
                  setProgress("items");
                } else if (progress === "payment") {
                  setProgress("address");
                }
              }}
              className={`text-xl cursor-pointer ${
                progress === "items" && "hidden"
              }`}
            />
          </div>
          {progress === "items" && <CheckOutItems buyItems={buyItems} />}
          {progress === "address" && <Address />}
          {progress === "payment" && <CheckOutPayment buyItems={buyItems} />}
          <hr className="border-2 mx-16" />
          <div className="m-auto flex justify-between gap-5 p-10 max-w-3xl items-center">
            <div className="text-gray-600">
              <p>Retail Total:{oldAmount}</p>
              <p>Discount:{oldAmount - totalAmount}</p>
              <p>Delivery Charges: ₹200</p>
              <p className="text-green-500">Total:{totalAmount + 200} </p>
            </div>

            <div className="flex gap-x-5 flex-col">
              <div className="mt-5">
                <p className="text-green-500 text-xl">
                  Total: ₹{totalAmount + 200}
                </p>
                <p className="text-gray-400 line-through">₹{oldAmount} </p>
              </div>
              {progress === "items" && (
                <button
                  onClick={() => {
                    setProgress("address");
                  }}
                  className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs">
                  Confirm items
                </button>
              )}
              {progress === "address" && (
                <button
                  onClick={() => {
                    setProgress("payment");
                  }}
                  className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed">
                  Proceed to Payment
                </button>
              )}
              {progress === "payment" && (
                <button
                  onClick={() => {
                    alert("Payment Successful");
                    dispatch(clearCart());
                    dispatch(clearBuy());
                    navigate("/");
                  }}
                  className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed">
                  Pay ₹{totalAmount + 200}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
