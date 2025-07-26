import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const SelectField = ({ data, name, errors, setValue, register, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [selectname, setSelectname] = useState();

  useEffect(() => {
    if (value == undefined) {
      setSelectOption("");
    }
  }, [value]);

  const handleSelect = (value) => {
    setSelectOption(value.id);
    setSelectname(value.name)
    setValue(name, value.id, { shouldValidate: true });
    setIsOpen(false);
  };

  return (
    <div className=" relative text-sm w-full">
      <h2 className="mt-5 font-extrabold">{name}</h2>

      <input type="hidden" {...register(name)} value={selectOption} readOnly />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 my-2 border border-[#919EAB] rounded-2xl  flex justify-between ${
          selectOption ? "text-black" : "text-[#919EAB]"
        }`}
      >
        {selectname || name}
        <span>
          <MdOutlineKeyboardArrowDown size={25} />
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full bg-white rounded-2xl shadow-2xl">
          <ul className="py-5 font-extrabold">
            {data?.map((option) => (
              <li
                key={option?.id}
                onClick={() => handleSelect(option)}
                className="my-2 p-3 pl-5 cursor-pointer hover:bg-[#919eab34]"
              >
                {option?.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default SelectField;
