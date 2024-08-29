import { BsCartX } from "react-icons/bs";
import useCartUtil from "../../hooks/useCartUtil";
import {
  quantityMinusUtil,
  quantityPlusUtil,
  removeFromCartUtil,
} from "../../utils/cartUtils";
import NoItem from "../NoItem";
import Button from "../Button";

export default function CartItem({ product }) {
  const productDetails = product.productID;
  const total = productDetails.price * product.quantity;
  const oldTotal = productDetails.oldPrice * product.quantity;

  const { utilFunction: quantityPlus, loading: plusLoading } =
    useCartUtil(quantityPlusUtil);
  const { utilFunction: quantityMinus, loading: minusLoading } =
    useCartUtil(quantityMinusUtil);
  const { utilFunction: removeFromCart, loading: removeLoading } =
    useCartUtil(removeFromCartUtil);

  return (
    <div className=" border-b-2 p-5">
      {!product ? (
        <NoItem productID={productDetails._id} />
      ) : (
        <div className="flex justify-between bg-white overflow-hidden">
          <div className="w-1/2">
            <p className="text-xl">{productDetails.name}</p>
            <img
              className="w-full h-60 object-cover"
              src={productDetails.image}
              alt={productDetails.name}
            />
          </div>

          <div className="flex flex-col justify-between pt-5">
            <div>
              <p>Quantity: {product.quantity} </p>
              <div className="flex gap-2 mt-2">
                <Button
                  disabled={plusLoading || minusLoading || removeLoading}
                  onClick={() => {
                    quantityPlus({
                      productID: productDetails._id,
                      quantity: product.quantity,
                    });
                  }}>
                  +
                </Button>
                <Button
                  disabled={
                    product.quantity === 1 ||
                    minusLoading ||
                    removeLoading ||
                    plusLoading
                  }
                  onClick={() => {
                    quantityMinus({
                      productID: productDetails._id,
                      quantity: product.quantity,
                    });
                  }}
                  className={product.quantity === 1 && "hidden"}>
                  -
                </Button>
                <Button
                  disabled={removeLoading || plusLoading || minusLoading}
                  onClick={() => {
                    confirm("Do you want to remove this item from cart?") &&
                      removeFromCart({
                        productID: productDetails._id,
                        quantity: product.quantity,
                      });
                  }}>
                  <BsCartX />
                </Button>
              </div>
            </div>
            <div>
              <p>
                Unit Price:{" "}
                <span className="text-orange-500">
                  ₹{productDetails.price}{" "}
                </span>
                <span className="text-gray-400 line-through">
                  ₹{productDetails.oldPrice}
                </span>
              </p>
              <div className=" flex flex-wrap gap-5">
                <span className="text-green-500">Total: ₹{total}</span>
                <span className="text-gray-400 line-through">₹{oldTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
