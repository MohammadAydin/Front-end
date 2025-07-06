import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import statusTask from "../../hooks/statusTask";

const Filter = ({ options = [], selectedValue, setSelectedValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-[#194894] text-2xl"
      >
        <FaFilter />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 right-0 w-40 bg-white border rounded p-1 shadow-md max-h-60 overflow-auto">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedValue(option);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer text-sm ${
                selectedValue === option
                  ? "bg-secondaryColor  text-white"
                  : "hover:bg-gray-100 "
              }`}
            >
              {option !== "all" ? statusTask(option).statusText : "All Tasks"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;