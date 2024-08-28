import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function MobileSideBar({ menuOpen, setMenuOpen, menuItems }) {
  return (
    <div
      className={` bg-stone-100 md:hidden shadow-md w-56 absolute top-0 right-0 h-screen transition-transform duration-500 ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
      <div className="flex justify-end p-2 h-16 items-center">
        <HiX
          onClick={() => setMenuOpen(false)}
          className="text-3xl cursor-pointer text-orange-900 hover:text-orange-700"
        />
      </div>
      <div className="flex flex-col items-start text-orange-900 gap-2">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            className="flex flex-col justify-center items-center border-b-2 border-orange-800 w-full p-2 hover:bg-orange-200"
            to={item.to}>
            <>{item.title}</>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
