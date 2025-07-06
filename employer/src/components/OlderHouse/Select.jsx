import React, { useState, useEffect, useRef } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";

const Select = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <IoCalendarClearOutline />
          {title}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleOptionClick("Account settings")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700"
              role="menuitem"
            >
              per Week
            </button>
            <button
              onClick={() => handleOptionClick("Support")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700"
              role="menuitem"
            >
              Per Month
            </button>
            <button
              onClick={() => handleOptionClick("License")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700"
              role="menuitem"
            >
              Per Year
            </button>
            <button
              onClick={() => handleOptionClick("Sign out")}
              className=" w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center gap-2.5 "
              role="menuitem"
            >
              custom date
              <IoCalendarClearOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
