import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function SearchField() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${value}`);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

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
        />
        <button className="-m-7">
          <HiSearch className="text-orange-900 text-2xl" />
        </button>
      </form>
    </div>
  );
}
