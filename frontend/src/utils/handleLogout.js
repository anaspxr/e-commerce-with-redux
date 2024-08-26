import { resetCart } from "../Store/cartSlice";
import { logout } from "../Store/userSlice";

export const handleLogout = (dispatch) => {
  dispatch(logout());
  dispatch(resetCart());
};
