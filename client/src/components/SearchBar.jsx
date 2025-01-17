import React from "react";
import "./css/components.css";
import { GrSearch } from "react-icons/gr";


const SearchBar = () => {
  return (
    <>
      <div className="searchbar">
        <form action="">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <i>
              <GrSearch />
            </i>
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
