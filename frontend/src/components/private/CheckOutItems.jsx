import { useDispatch } from "react-redux";
import {
  buyQuantityMinus,
  buyQuantityPlus,
  removeFromBuy,
} from "../../Store/cartSlice";
import { useState } from "react";
import ConfirmPopUp from "../ConfirmPopUp";

export default function CheckOutItems({ buyItems }) {
  const dispatch = useDispatch();
  const [confirmRemove, setConfirmRemove] = useState(null);

  return (
    <div className="m-auto max-w-3xl flex flex-col gap-3 p-2 ">
      {buyItems.map((product) => {
        const productDetails = product.productID;
        const total = productDetails?.price * product.quantity;
        return (
          <div key={productDetails._id} className=" shadow-md p-1 rounded-sm ">
            <div className="flex justify-between items-center bg-white overflow-hidden ">
              <p>
                {productDetails.name} x {product.quantity}
              </p>
              <div>
                <p>Quantity: {product.quantity}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      dispatch(buyQuantityPlus(product.productID._id));
                    }}
                    className="border min-w-10 text-sm border-orange-900  px-2 py-1 rounded-md text-gray-700  hover:bg-orange-100">
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(buyQuantityMinus(product.productID._id));
                    }}
                    className="border min-w-10 text-sm border-orange-900  px-2 py-1 rounded-md text-gray-700  hover:bg-orange-100">
                    -
                  </button>
                  <button
                    onClick={() => setConfirmRemove(product.productID._id)}
                    className="border text-sm border-orange-900  px-2 py-1 rounded-md text-gray-700  hover:bg-orange-100">
                    Remove
                  </button>
                </div>
                <p className="text-green-500">Total: ₹{total}</p>
              </div>
            </div>
          </div>
        );
      })}
      {confirmRemove && (
        <ConfirmPopUp
          message="Are you sure you want to remove this item?"
          onConfirm={() => {
            dispatch(removeFromBuy({ cartID: confirmRemove }));
            setConfirmRemove(null);
          }}
          onCancel={() => setConfirmRemove(null)}
        />
      )}
    </div>
  );
}
