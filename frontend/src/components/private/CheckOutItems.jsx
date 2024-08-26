import { useDispatch } from "react-redux";
import {
  buyQuantityMinus,
  buyQuantityPlus,
  removeFromBuy,
} from "../../Store/cartSlice";
import { FaTrash } from "react-icons/fa";

export default function CheckOutItems({ buyItems }) {
  const dispatch = useDispatch();

  return (
    <div className="m-auto max-w-3xl flex flex-wrap gap-3 p-2 justify-center">
      {buyItems.map((product) => {
        const productDetails = product.productID;
        const total = productDetails?.price * product.quantity;
        return (
          <div key={productDetails._id} className="shadow-md p-1 rounded-sm">
            <div className="flex flex-col justify-between bg-white overflow-hidden ">
              <img
                className="w-52 h-32 object-cover"
                src={productDetails.image}
                alt={productDetails.name}
              />
              <div>
                <p>{product.name}</p>
                <p>
                  Quantity: {product.quantity}
                  <button
                    onClick={() => {
                      dispatch(buyQuantityPlus(product.productID._id));
                    }}
                    className="bg-orange-200 h-7 w-7 rounded-md mr-1 hover:bg-orange-300">
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(buyQuantityMinus(product.productID._id));
                    }}
                    className="bg-orange-200 h-7 w-7 rounded-md hover:bg-orange-300">
                    -
                  </button>
                  <button
                    onClick={() => {
                      confirm(
                        "Do you want to remove this item from checkout?"
                      ) &&
                        dispatch(
                          removeFromBuy({ cartID: product.productID._id })
                        );
                    }}
                    className="bg-orange-200 h-6 w-6 rounded-md text-gray-700 flex justify-center items-center hover:bg-orange-300">
                    <FaTrash />
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
