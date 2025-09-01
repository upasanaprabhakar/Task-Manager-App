import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, value, onChange, filter, setFilter }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filterOptions = ["All", "Pending", "Ongoing", "Completed"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <div className="custom-dropdown" ref={dropdownRef}>
        <div
          className="dropdown-header"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {filter}
          <span className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}>
            ▼
          </span>
        </div>

        {dropdownOpen && (
          <ul className="dropdown-options">
            {filterOptions.map((option) => (
              <li
                key={option}
                className="dropdown-option"
                onClick={() => {
                  setFilter(option);
                  setDropdownOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
