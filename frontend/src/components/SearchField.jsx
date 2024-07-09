import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import getSearchResults from "../utils/getSearchResults.js";

//? this component accepts 4 props: searchData, handleSearch,handleCKick,searchItems
// searchData is the data to be searched
// handleSearch is a function that gets the search value after the form is submitted
// handleClick is a function that gets the clicked item and what to do with it
// searchItems is an array of key names of properties of searchData to search

export default function SearchField({
  searchData,
  handleSearch,
  handleClick,
  searchItems,
}) {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(value);
  }

  function handleChange(e) {
    !isOpen && setIsOpen(true);
    setValue(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }
    setSearchResults(getSearchResults(searchData, e.target.value, searchItems));
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#search-container")) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          autoComplete="off"
          id="search-container"
          className="h-7 p-1 w-full outline-none border-b border-orange-900 bg-transparent"
          placeholder="Search.."
          type="text"
          onChange={handleChange}
          onClick={() => setIsOpen(true)}
        />
        <button className="-m-7">
          <HiSearch className="text-orange-900 text-2xl" />
        </button>
      </form>

      {isOpen && value.length > 0 && (
        <div className="min-w-60 h-52 overflow-y-scroll py-2 mt-2 rounded-md bg-stone-100 shadow-md absolute">
          {searchResults.length === 0 && (
            <p className="p-1">No results found!!</p>
          )}
          {searchResults.map((item) => (
            <button
              className="w-full p-1 text-left hover:bg-stone-200"
              key={item.id}
              onClick={() => {
                handleClick(item);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
