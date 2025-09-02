import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CalendarCustom.css";
import { IoClose } from "react-icons/io5";
import { PiCalendarDotsBold } from "react-icons/pi";

const CalendarRange = ({ register, name, errors, setValue }) => {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div
        className=" relative w-full cursor-pointer mt-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className=" font-extrabold text-sm" htmlFor={name}>
          Date
        </label>
        <input
          {...register(name)}
          type="text"
          readOnly
          value={
            range.from && range.to
              ? `${formatDate(range.from)} to ${formatDate(range.to)}`
              : ""
          }
          placeholder="Select date range"
          className="w-full p-4 my-2 border border-[#919EAB] rounded-2xl  focus:outline-[#919EAB] cursor-pointer"
        />
        <div
          className={`CalendarIcon absolute ${
            errors[name] ? "top-[40%]" : "top-[50%]"
          } left-[93%]`}
        >
          <PiCalendarDotsBold size={25} />
        </div>
        {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
      </div>
      {isOpen && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white shadow-2xl p-4 rounded-md">
          <div className="CalendarRange w-[400px] flex justify-end">
            <IoClose
              className=" cursor-pointer"
              size={25}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <DayPicker
            animate
            mode="range"
            selected={range}
            onSelect={(selectedRange) => {
              if (selectedRange) {
                setRange(selectedRange);
                setValue(name, selectedRange, { shouldValidate: true });
              } else {
                setRange({ from: undefined, to: undefined });
                setValue(
                  name,
                  { from: undefined, to: undefined },
                  { shouldValidate: true }
                );
              }
            }}
            numberOfMonths={1}
            className="custom-calendar"
          />

          <div className="flex gap-3 items-center justify-end mt-4">
            <button
              type="button"
              className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg hover:bg-[#cfcfd3]"
              onClick={() => setRange({ from: undefined, to: undefined })}
            >
              Clear
            </button>

            <button
              type="button"
              className="bg-[#F47621] text-white text-lg font-extrabold px-10 py-2 rounded-lg hover:bg-[#EE6000]"
              onClick={() => setIsOpen(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarRange;
