import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Address from "../components/Address";
import { ProductContext } from "../contexts/ProductContext";
import useFetch from "../utils/useFetch";
import { UserContext } from "../contexts/UserContext";

export default function Checkout() {
  useEffect(() => {
    if (Object.keys(buyItems).length === 0) {
      navigate("/cart");
    }
  });

  const navigate = useNavigate();
  const { products, loading, error } = useContext(ProductContext);
  const { buyItems, setBuyItems, setCartItems } = useContext(CartContext);
  const [progress, setProgress] = useState("items");

  const totalAmount = Object.keys(buyItems).reduce((acc, productID) => {
    const product = products?.find((item) => item.id === productID);
    return acc + Number(product.discountPrice) * Number(buyItems[productID]);
  }, 0);
  const oldAmount = Object.keys(buyItems).reduce((acc, productID) => {
    const product = products?.find((item) => item.id === productID);
    return acc + Number(product.oldPrice) * Number(buyItems[productID]);
  }, 0);

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
          {progress === "items" && (
            <Items buyItems={buyItems} setBuyItems={setBuyItems} />
          )}
          {progress === "address" && <Address />}
          {progress === "payment" && <Payment items={buyItems} />}
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
                  className="bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs"
                >
                  Confirm items
                </button>
              )}
              {progress === "address" && (
                <button
                  onClick={() => {
                    setProgress("payment");
                  }}
                  className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              )}
              {progress === "payment" && (
                <button
                  onClick={() => {
                    alert("Payment Successful");
                    setCartItems({});
                    setBuyItems({});
                    navigate("/");
                  }}
                  className="disabled:bg-opacity-50 bg-orange-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit md:text-base text-xs disabled:cursor-not-allowed"
                >
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

function Items({ buyItems, setBuyItems }) {
  const { products } = useContext(ProductContext);
  return (
    <div className="m-auto max-w-3xl flex flex-wrap gap-3 p-2 justify-center">
      {Object.keys(buyItems).map((productID) => {
        const product = products?.find((item) => item.id === productID);
        const total = product.discountPrice * buyItems[productID];
        return (
          <div key={productID} className="shadow-md p-1 rounded-sm">
            <div
              key={productID}
              className="flex flex-col justify-between bg-white overflow-hidden "
            >
              <img
                className="w-52 h-32 object-cover"
                src={product.image}
                alt={product.name}
              />
              <div>
                <p>{product.name}</p>
                <p>
                  Quantity: {buyItems[productID]}{" "}
                  <button
                    onClick={() => {
                      setBuyItems({
                        ...buyItems,
                        [productID]: buyItems[productID] + 1,
                      });
                    }}
                    className="bg-orange-200 h-7 w-7 rounded-md mr-1 hover:bg-orange-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (buyItems[productID] === 1) {
                        const newBuyItems = { ...buyItems };
                        delete newBuyItems[productID];
                        setBuyItems(newBuyItems);
                        return;
                      }
                      setBuyItems({
                        ...buyItems,
                        [productID]: buyItems[productID] - 1,
                      });
                    }}
                    className="bg-orange-200 h-7 w-7 rounded-md hover:bg-orange-300"
                  >
                    -
                  </button>
                </p>
                <p className="text-green-500">Total: ₹{total}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Payment({ items }) {
  const { products } = useContext(ProductContext);
  const { currentUser } = useContext(UserContext);
  const { data, loading, error } = useFetch(
    `http://localhost:3000/users/${currentUser.id}`
  );
  const address = data?.address;
  return (
    <div className="m-auto max-w-3xl p-5 text-orange-900">
      <h1 className="text-2xl py-3">Payment</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <p className="text-xl">Your address</p>
          <p>{address.name}</p>
          <p>
            {address.address},{address.city},{address.state},{address.pincode}
          </p>
          <p>{address.phone}</p>
          <h3 className="text-xl py-5">Items</h3>
          <div className="flex flex-col gap-2">
            {Object.keys(items).map((productID) => {
              const product = products?.find((item) => item.id === productID);
              return (
                <>
                  {products && (
                    <div key={productID} className="flex justify-between">
                      <p>{product.name}</p>
                      <p>Quantity: {items[productID]}</p>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
