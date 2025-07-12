import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilteringHoursOptions from "./FilteringOptions";
import { FiFilter } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useWorkingHoursStore } from "../../store/WorkingHoursStore";

const FilteringHours = () => {
  const { setRawData } = useWorkingHoursStore();
  const { register, setValue, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState("");

  const addFilteringHours = useMutation({
    mutationFn: (filter) =>
      customFetch
        .post("https://woundwann.de/v1/week/worked/hours", filter)
        .then((res) => res.data),

    onSuccess: (data) => {
      setRawData(data.data);
    },
  });

  const onSubmit = (data) => {
    setIsOpen(false);
    addFilteringHours.mutate({ date: data.FilteringHours });
  };

  return (
    <form className="FilteringHours relative w-full max-w-[200px]">
      {/* Hidden input to hold selected value */}
      <input
        type="hidden"
        {...register("FilteringHours")}
        value={selectOption}
        readOnly
      />

      {/* Dropdown Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`FilteringHoursBtn w-full p-3 border-[1.5px] border-[#919eab52] rounded-xl flex justify-between items-center ${
          selectOption ? "text-black" : "text-[#919EAB]"
        }`}
      >
        <div className="flex items-center gap-2">
          <FiFilter />
          {FilteringHoursOptions.find((opt) => opt.value === selectOption)
            ?.label || "Filter by"}
        </div>
        <MdOutlineKeyboardArrowDown size={25} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="FilteringHoursOption absolute z-50 w-full bg-white rounded-2xl shadow-2xl mt-2">
          <div className="py-5 font-extrabold flex flex-col">
            {FilteringHoursOptions.map((option) => (
              <button
                type="submit"
                key={option.label}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectOption(option.value);
                  setValue("FilteringHours", option.value);
                  if (option.label === "Last 7 days") {
                    setRawData([]);
                    setIsOpen(false);
                  } else {
                    handleSubmit(onSubmit)();
                  }
                }}
                className="text-left my-1 px-5 py-3 hover:bg-[#919eab34] transition rounded-xl"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default FilteringHours;
