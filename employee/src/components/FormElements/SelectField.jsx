import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const SelectField = ({ name, errors, setValue, register, value, Options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState("");

  useEffect(() => {
    if (value == undefined) {
      setSelectOption("");
    }
  }, [value]);

  const handleSelect = (value) => {
    setSelectOption(value);
    setValue(name, value, { shouldValidate: true });
    setIsOpen(false);
  };

  return (
    <div className=" relative w-full">
      <input type="hidden" {...register(name)} value={selectOption} readOnly />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3  border-[1.5px] border-[#919eab52] rounded-xl  flex justify-between ${
          selectOption ? "text-black" : "text-[#919EAB]"
        }`}
      >
        {selectOption || name}
        <span>
          <MdOutlineKeyboardArrowDown size={25} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bg-white rounded-2xl shadow-2xl">
          <ul className="py-5 font-extrabold">
            {Options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="my-2 p-3 pl-5 cursor-pointer hover:bg-[#919eab34]"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors[name] && (
        <p className="text-red-500 mt-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectField;
