import { useContext, useEffect, useState } from "react";
import icon from "../components/assets/logo-small.png";
import { Link, useLocation } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { FaUsers, FaBagShopping } from "react-icons/fa6";
import {
  MdSpaceDashboard,
  MdAdminPanelSettings,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { PiSignOutFill } from "react-icons/pi";
import { UserContext } from "../contexts/UserContext";

export default function Admin({ children }) {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", icon: <MdSpaceDashboard />, link: "admin" },
    { name: "Users", icon: <FaUsers />, link: "admin/users" },
    { name: "Products", icon: <FaBagShopping />, link: "admin/products" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { logout, currentUser } = useContext(UserContext);
  const [rightIconOpen, setRightIconOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#rightIcon")) {
        return;
      }
      setRightIconOpen(false);
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  });
  return (
    <>
      <div className="flex items-center bg-slate-300 justify-between fixed top-0 z-50 w-full  border-b border-slate-400 px-3 py-3 lg:px-5 lg:pl-3 shadow-md">
        <div className="flex items-center justify-start rtl:justify-end">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type="button"
            className="inline-flex items-center p-2 text-sm text-slate-950 hover:text-slate-800 rounded-lg sm:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 "
          >
            <RiMenu2Line className="text-3xl hover:text-slate-600" />
          </button>
          <Link to="/admin" className="flex ms-2 md:me-24">
            <img src={icon} className="h-8 me-3" alt="FlowBite Logo" />
            <span className="text-orange-950 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
              Admin
            </span>
          </Link>
        </div>
        <button
          id="rightIcon"
          onClick={() => {
            setRightIconOpen(!rightIconOpen);
          }}
          className="flex items-center ms-3 hover:text-slate-500"
        >
          <p className="hidden sm:block">{currentUser?.email}</p>
          <MdAdminPanelSettings className="text-4xl" />
        </button>

        <div
          className={`${
            rightIconOpen ? "block" : "hidden"
          } absolute top-16 right-2 bg-slate-200 border border-slate-200 rounded-md shadow-lg`}
        >
          <div className="space-y-2 font-medium">
            <Link
              to="/"
              className=" flex items-center p-2 text-slate-950 rounded-lg  hover:bg-slate-300  group"
            >
              Leave Admin page
            </Link>

            <p
              className="cursor-pointer flex items-center p-2 text-slate-950 rounded-lg  hover:bg-slate-300  group"
              onClick={logout}
            >
              <PiSignOutFill />
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          !isOpen && "-translate-x-full"
        }  bg-slate-300 border-r border-slate-400 sm:translate-x-0`}
      >
        <div className="h-full px-3 overflow-y-auto">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-full mb-2 p-2 flex justify-end text-2xl hover:bg-slate-200 rounded-md hover:text-slate-600 sm:hidden"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>

          <ul className="space-y-2 font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`${
                    location.pathname === "/" + item.link && "bg-slate-200"
                  } flex items-center p-2 text-slate-950 rounded-lg  hover:bg-slate-200  group`}
                >
                  {item.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            <li
              className="cursor-pointer flex items-center p-2 text-slate-950 rounded-lg  hover:bg-slate-200  group"
              onClick={logout}
            >
              <PiSignOutFill />
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="sm:ml-64 mt-20 m-5 p-4">{children}</div>
    </>
  );
}
