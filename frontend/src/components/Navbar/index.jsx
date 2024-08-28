import logo from "../../assets/logo.png";
import logoSmall from "../../assets/logo-small.png";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "../Button";
import SearchField from "../SearchField";
import { useSelector } from "react-redux";
import CategoriesDropDown from "./CategoriesDropDown";
import MobileSideBar from "./MobileSideBar";
import ProfileIcon from "./ProfileIcon";
import { BsBoxSeam, BsHeart } from "react-icons/bs";

const menuItems = [
  {
    title: "All Categories",
    to: "/products",
  },
  {
    title: "Home Decor",
    to: "/products/homedecor",
  },
  {
    title: "Sofas & Seatings",
    to: "/products/sofa",
  },
  {
    title: "Kitchen & dining",
    to: "/products/dining",
  },
  {
    title: "Furnishing",
    to: "/products/furnishings",
  },
  {
    title: "Lightings",
    to: "/products/lightings",
  },
  {
    title: "mattresses",
    to: "/products/mattresses",
  },
];

export default function Navbar() {
  const cart = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#menuButton")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`${
        scrolled ? "shadow-lg  py-1  bg-stone-50" : "bg-white"
      }   fixed top-0 w-full flex justify-between items-center p-2 z-10 transition-[padding,shadow,background-color] duration-500`}>
      <div
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className="flex items-center">
        <Link className="hidden sm:block" to="/">
          <img
            className={`h-12 ${
              scrolled ? "md:h-12" : "md:h-14 "
            } transition-[height] duration-700 `}
            src={logo}
            alt="Comfort Craft"
          />
        </Link>
        <Link className="sm:hidden" to="/">
          <img
            className={`h-9 ${
              scrolled ? "md:h-14" : "md:h-16 "
            } transition-[height] duration-700 `}
            src={logoSmall}
            alt="Comfort Craft"
          />
        </Link>
      </div>

      <div className="2xl:flex hidden items-center gap-5  text-orange-950">
        {menuItems.map((item, i) => (
          <NavLink
            end
            key={i}
            className="flex flex-col justify-center items-center"
            to={item.to}>
            {({ isActive }) => {
              //? for the active tab indicator
              return (
                <>
                  {item.title}
                  {isActive && (
                    <hr className="border-none rounded-sm h-1 bg-orange-900 w-5/6" />
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-2 lg:gap-4 ">
        <SearchField />
        <CategoriesDropDown menuItems={menuItems} />
        {currentUser && !isAdmin && (
          <>
            <Link
              to="/wishlist"
              className="hidden lg:inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-900 shadow-sm ring-1 ring-inset ring-stone-200 hover:bg-gray-50">
              Wishlist <BsHeart />
            </Link>
            <Link
              to="/orders"
              className="hidden lg:inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-900 shadow-sm ring-1 ring-inset ring-stone-200 hover:bg-gray-50">
              Orders <BsBoxSeam />
            </Link>
          </>
        )}

        {currentUser && !isAdmin && (
          <div className="flex">
            <Link to="/cart">
              <MdOutlineShoppingCart className="text-3xl text-orange-900 hover:text-orange-700" />
            </Link>
            <div className="w-4 h-4 flex justify-center items-center text-sm -ml-4 -mt-1 rounded-full bg-orange-600 text-white">
              {cart?.length || 0}
            </div>
          </div>
        )}
        {currentUser ? (
          <ProfileIcon isAdmin={isAdmin} currentUser={currentUser} />
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}

        <HiMenuAlt1
          id="menuButton"
          onClick={() => {
            setMenuOpen(true);
          }}
          className="text-3xl cursor-pointer md:hidden text-orange-900 hover:text-orange-700"
        />
      </div>
      <MobileSideBar
        menuItems={menuItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </div>
  );
}
