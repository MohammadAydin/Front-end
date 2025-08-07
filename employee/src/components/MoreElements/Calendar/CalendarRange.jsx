import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CalendarCustom.css";
import { IoClose } from "react-icons/io5";
import { PiCalendarDotsBold } from "react-icons/pi";

const CalendarRange = ({ register, name, errors, setValue }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 11 },
    (_, i) => 1900 + i
  );

  const formatDate = (date) => (date ? date.toLocaleDateString("en-CA") : "");

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    const newDate = selectedDate ? new Date(selectedDate) : new Date();
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    setValue(name, formatDate(newDate), { shouldValidate: true });
  };

  const handleDaySelect = (date) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(selectedYear); 
      setSelectedDate(newDate);

      setValue(name, formatDate(newDate), { shouldValidate: true });
    } else {
      setSelectedDate(undefined);
      setValue(name, "", { shouldValidate: true });
    }
  };

  return (
    <>
      <div
        className="relative  w-full cursor-pointer mt-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className="font-extrabold text-sm" htmlFor={name}>
          Date
        </label>
        <input
          {...register(name)}
          type="text"
          readOnly
          value={selectedDate ? formatDate(selectedDate) : ""}
          placeholder="Select date range"
          className="w-full p-4 my-2 border border-[#919EAB] rounded-2xl focus:outline-[#919EAB] cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white shadow-2xl p-4 rounded-md w-[400px]">
            <div className="CalendarRange flex justify-between items-center mb-4">
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="year-dropdown border border-[#919EAB] rounded-md p-2 bg-[#F1F1F5] text-[#28293D] font-semibold"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <IoClose
                className="cursor-pointer"
                size={25}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <DayPicker
              animate
              mode="single"
              selected={selectedDate}
              onSelect={handleDaySelect}
              numberOfMonths={1}
              className="custom-calendar"
              defaultMonth={
                new Date(
                  selectedYear,
                  selectedDate ? selectedDate.getMonth() : 0
                )
              }
            />

            <div className="flex gap-3 items-center justify-end mt-4">
              <button
                type="button"
                className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg hover:bg-[#cfcfd3]"
                onClick={() => {
                  setSelectedDate(undefined);
                  setSelectedYear(currentYear);
                  setValue(name, "", { shouldValidate: true });
                }}
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
        </div>
      )}
    </>
  );
};

export default CalendarRange;
