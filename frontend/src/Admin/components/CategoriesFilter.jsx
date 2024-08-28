import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function CategoriesFilter({ setUrl }) {
  const categories = [
    {
      title: "All Categories",
      url: "/public/products",
    },
    {
      title: "Home Decor",
      url: "/public/products?category=homedecor",
    },
    {
      title: "Sofas & Seatings",
      url: "/public/products?category=sofa",
    },
    {
      title: "Kitchen & dining",
      url: "/public/products?category=dining",
    },
    {
      title: "Furnishing",
      url: "/public/products?category=furnishings",
    },
    {
      title: "Lightings",
      url: "/public/products?category=lightings",
    },
    {
      title: "mattresses",
      url: "/public/products?category=mattresses",
    },
  ];
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
    <div id="categoryButton" className=" relative text-left ">
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="bg-slate-500 inline-flex items-center text-white px-2 py-1 rounded-md  gap-1 hover:bg-opacity-85 min-w-32 text-center">
          Categories
          <HiChevronDown className="-mr-1 h-5 w-5 text-slate-100" />
        </button>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"}
           absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 `}>
        <div className="py-1">
          {categories.map((item, i) => (
            <button
              onClick={() => setUrl(item.url)}
              key={i}
              className="block w-full px-4 py-2 text-sm text-slate-900-900 hover:bg-slate-50"
              role="menuitem">
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
