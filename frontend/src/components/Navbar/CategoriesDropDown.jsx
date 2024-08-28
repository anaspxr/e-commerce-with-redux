import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function CategoriesDropDown({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#categoryButton")) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      id="categoryButton"
      className="hidden md:inline-block 2xl:hidden relative text-left ">
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-900 shadow-sm ring-1 ring-inset ring-stone-200 hover:bg-gray-50">
          Categories
          <HiChevronDown className="-mr-1 h-5 w-5 text-orange-900" />
        </button>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"}
           absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 `}>
        <div className="py-1">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className="block px-4 py-2 text-sm text-orange-900 hover:bg-orange-50"
              role="menuitem">
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
