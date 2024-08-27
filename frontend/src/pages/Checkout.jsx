import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Address from "../components/Address";
import { useSelector } from "react-redux";
import CheckOutItems from "../components/private/CheckOutItems.jsx";
import CheckOutPayment from "../components/private/CheckOutPayment.jsx";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import axiosErrorCatch from "../utils/axiosErrorCatch.js";
import { toast } from "react-toastify";

export default function Checkout() {
  useEffect(() => {
    if (buyItems.length === 0) {
      toast.error("No items selected, redirecting to cart");
      navigate("/cart");
    }
  });
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const { buyItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [progress, setProgress] = useState("items");
  const address = {
    name: currentUser.name,
    city: "manjeri",
    flatName: "mows",
    state: "kerala",
    pincode: "766521",
    phone: "9876543210",
  };
  const totalAmount = buyItems.reduce(
    (acc, product) => acc + product.productID?.price * product.quantity,
    0
  );

  const oldAmount = buyItems.reduce(
    (acc, product) => acc + product.productID?.oldPrice * product.quantity,
    0
  );

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await loadStripe(
        "pk_test_51PqTjg2KqNuB5bGxCB5yBjHnBJ9KgoKCDs6MLYOzL9a4x0DEjsxoMZiQp5fR222KFS4cwwxRBCDjlrnL7IHAIlPj00ICeQqUlR"
      );

      const body = {
        amount: totalAmount,
        products: buyItems.map((product) => ({
          productID: product.productID._id,
          quantity: product.quantity,
        })),
        address,
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/user/checkout",
        body,
        {
          headers: { token: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      const results = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      console.log(results);

      if (results.error) {
        alert("Payment Failed, Error:" + results.error.message);
        setLoading(false);
      } else {
        alert("Payment Successful, Order placed successfully!!");
        setLoading(false);
        // dispatch(clearCart());
        // dispatch(clearBuy());
        // navigate("/");
      }
    } catch (error) {
      setLoading(false);
      const msg = axiosErrorCatch(error);
      alert("Payment Failed, " + msg);
    }
  };

  return (
    <div className="text-orange-800 p-5">
      <h1 className="text-2xl text-center text-orange-900 my-5">Checkout</h1>

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
            {/* <p>Delivery Charges: ₹200</p> */}
            <p className="text-green-500">Total:{totalAmount} </p>
          </div>

          <div className="flex gap-x-5 flex-col">
            <div className="mt-5">
              <p className="text-green-500 text-xl">Total: ₹{totalAmount}</p>
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
                disabled={loading}
                onClick={handlePayment}
                className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed">
                {loading ? "redirecting.." : `Pay ₹${totalAmount}`}
              </button>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
