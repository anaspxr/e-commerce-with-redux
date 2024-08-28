import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Address from "../components/Address";
import { useSelector } from "react-redux";
import CheckOutItems from "../components/private/CheckOutItems.jsx";
import CheckOutPayment from "../components/private/CheckOutPayment.jsx";
import { toast } from "react-toastify";

export default function Checkout() {
  useEffect(() => {
    if (buyItems.length === 0) {
      toast.error("No items selected, redirecting to cart");
      navigate("/cart");
    }
  });
  const { buyItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [progress, setProgress] = useState("items");
  const [address, setAddress] = useState(null);

  const totalAmount = buyItems.reduce(
    (acc, product) => acc + product.productID?.price * product.quantity,
    0
  );

  const oldAmount = buyItems.reduce(
    (acc, product) => acc + product.productID?.oldPrice * product.quantity,
    0
  );

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
        {progress === "address" && <Address setAddress={setAddress} />}
        {progress === "payment" && (
          <CheckOutPayment buyItems={buyItems} address={address} />
        )}
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
                disabled={!address}
                onClick={() => {
                  setProgress("payment");
                }}
                className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed">
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
