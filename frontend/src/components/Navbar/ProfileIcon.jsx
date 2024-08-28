import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import Button from "../Button";
import { BsBoxSeam, BsHeart, BsPerson } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../utils/handleLogout";
import { MdLogout } from "react-icons/md";

export default function ProfileIcon({ isAdmin, currentUser }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#profileButton")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <CgProfile
        id="profileButton"
        onClick={(e) => {
          e.stopPropagation();
          setProfileOpen(!profileOpen);
        }}
        className="text-3xl text-orange-900 hover:text-orange-700 cursor-pointer"
      />
      <div
        className={`${
          profileOpen ? "flex" : "hidden"
        } absolute flex-col p-2 gap-2 right-0 z-10 mt-2 min-w-56 origin-top-right mr-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}>
        <div className="text-sm">
          <div className=" mb-1">
            {isAdmin ? (
              <Link to="/admin">
                <Button>Admin Panel</Button>
              </Link>
            ) : (
              <div className="flex gap-2 flex-col">
                <Link to="/profile">
                  <Button>
                    Profile <BsPerson />
                  </Button>
                </Link>
                <Link className="lg:hidden inline" to="/orders">
                  <Button>
                    Orders <BsBoxSeam />
                  </Button>
                </Link>
                <Link className="lg:hidden inline" to="/wishlist">
                  <Button>
                    Wishlist <BsHeart />{" "}
                  </Button>
                </Link>
                <Button
                  className={`text-red-700 border-red-700 hover:bg-red-100`}
                  onClick={() => {
                    handleLogout(dispatch);
                  }}>
                  Log out
                  <MdLogout />
                </Button>
              </div>
            )}
          </div>
          Logged in as
          <span className="text-orange-900"> {currentUser.email}</span>
        </div>
      </div>
    </div>
  );
}
