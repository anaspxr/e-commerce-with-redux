import Button from "../components/Button";
import Address from "../components/Address";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../utils/handleLogout";
import { Link } from "react-router-dom";
import { BsBoxSeam, BsCart, BsHeart } from "react-icons/bs";

import { MdLogout } from "react-icons/md";
export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="grid md:grid-cols-2 p-5 my-10 shadow-lg  border mx-5 md:mx-32">
      <div className=" p-5 flex  flex-col rounded-lg gap-5">
        <h1 className="text-2xl text-orange-900">Profile</h1>
        <p className="text-lg text-orange-900">Name: {currentUser.name}</p>
        <p className="text-lg text-orange-900">Email: {currentUser.email}</p>
        <div className="flex flex-col max-w-40 gap-5">
          <Link to="/cart">
            <Button>
              Cart <BsCart />
            </Button>
          </Link>
          <Link to="/orders">
            <Button>
              Orders <BsBoxSeam />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button>
              Wishlist <BsHeart />
            </Button>
          </Link>
          <span>
            <Button
              className={`text-red-700 border-red-700 hover:bg-red-200`}
              onClick={() => {
                handleLogout(dispatch);
              }}>
              Log out
              <MdLogout />
            </Button>
          </span>
        </div>
      </div>
      <Address />
    </div>
  );
}
