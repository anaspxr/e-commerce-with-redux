import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Address from "../components/Address";
import { useDispatch, useSelector } from "react-redux";
import CheckOutItems from "../components/private/CheckOutItems.jsx";
import CheckOutPayment from "../components/private/CheckOutPayment.jsx";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { setWholeCart } from "../Store/cartSlice.js";

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
  const [codSelected, setCodSelected] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [orderPlacing, setOrderPlacing] = useState(false);

  const handleCodPayment = async () => {
    setOrderPlacing(true);
    const body = {
      amount: totalAmount,
      products: buyItems.map((product) => ({
        productID: product.productID._id,
        quantity: product.quantity,
      })),
      address,
    };
    try {
      const { data } = await axiosPrivate.post("/user/orders/cod", body);
      data.cart && dispatch(setWholeCart(data.cart.products));
      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    } finally {
      setOrderPlacing(false);
    }
  };

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
            <p>Total Price:{oldAmount}</p>
            <p>Discount:{oldAmount - totalAmount}</p>
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
              <>
                <span className="flex gap-4 items-center">
                  Pay on Delivery
                  <input
                    type="checkbox"
                    readOnly
                    className="bg-orange-700 accent-orange-800 cursor-pointer scale-125"
                    checked={codSelected}
                    onClick={() => {
                      setCodSelected(!codSelected);
                    }}
                  />
                </span>
                <button
                  disabled={!address}
                  onClick={() => {
                    codSelected ? handleCodPayment() : setProgress("payment");
                  }}
                  className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed">
                  {codSelected
                    ? orderPlacing
                      ? "Placing Order.."
                      : "Place Order"
                    : "Proceed to Payment"}
                </button>
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
