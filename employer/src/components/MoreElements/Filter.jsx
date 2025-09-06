import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Filter = ({ options = [], selectedValue, setSelectedValue }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const getFilterOptionText = (option) => {
    const filterTranslations = {
      all: t("HelpRequests.filter.all"),
      todo: t("HelpRequests.filter.todo"),
      done: t("HelpRequests.filter.done"),
      progress: t("HelpRequests.filter.progress"),
      review: t("HelpRequests.filter.review"),
      Canceled: t("HelpRequests.filter.Canceled"),
      Arrived: t("HelpRequests.filter.Arrived"),
      OntheWay: t("HelpRequests.filter.OntheWay"),
      cancel: t("HelpRequests.filter.cancel"),
      pending: t("HelpRequests.filter.pending"),
      taken: t("HelpRequests.filter.taken"),
    };

    return filterTranslations[option];
  };

  return (
    <div className="relative text-left ">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-[#194894] text-2xl"
      >
        <FaFilter className="" />
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
              {getFilterOptionText(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
