import { useDispatch, useSelector } from "react-redux";
import { clearFromCart } from "../Store/cartSlice";

export default function NoItem({ productID }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center flex-col items-center border h-full p-5 gap-5">
      <p>This item is no longer available..</p>
      <button
        className="bg-orange-100 rounded-md p-1 text-orange-950 hover:bg-orange-200"
        onClick={() => {
          dispatch(
            clearFromCart({ cartID: productID, userID: currentUser.id })
          );
        }}
      >
        Remove from cart
      </button>
    </div>
  );
}
