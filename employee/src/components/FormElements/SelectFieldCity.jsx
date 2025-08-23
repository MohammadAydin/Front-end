import React, { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "react-i18next";
import SpinnerLoading from "../MoreElements/SpinnerLoading.jsx";

const SelectFieldCity = ({
  name,
  errors,
  setValue,
  register,
  value,
  Options,
  label,
  disabled = false,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (value == undefined) {
      setSelectOption("");
      setSelectedLabel("");
    }
  }, [value]);

  useEffect(() => {
    if (selectOption && Options.length > 0) {
      const currentOption = Options.find((option) => {
        const optionValue = typeof option === "object" ? option.value : option;
        return optionValue === selectOption;
      });
      if (currentOption) {
        const optionLabel =
          typeof currentOption === "object"
            ? currentOption.label
            : currentOption;
        setSelectedLabel(optionLabel);
      }
    }
  }, [Options, selectOption]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value, label, index) => {
    setSelectOption(value);
    setSelectedLabel(label);
    setValue(name, value, { shouldValidate: true });
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    if (!isOpen) {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % Options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) => (prev <= 0 ? Options.length - 1 : prev - 1));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (focusedIndex >= 0) {
          const selectedOption = Options[focusedIndex];
          const optionValue =
            typeof selectedOption === "object"
              ? selectedOption.value
              : selectedOption;
          const optionLabel =
            typeof selectedOption === "object"
              ? selectedOption.label
              : selectedOption;
          handleSelect(optionValue, optionLabel, focusedIndex);
        }
        break;
      case "Home":
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        event.preventDefault();
        setFocusedIndex(Options.length - 1);
        break;
    }
  };

  const dropdownId = `${name}-dropdown`;
  const buttonId = `${name}-button`;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input type="hidden" {...register(name)} value={selectOption} readOnly />

      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full p-3 border-[1.5px] rounded-xl flex justify-between items-center transition-colors duration-200
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
          ${selectOption && !disabled ? "text-black" : "text-[#919EAB]"}
          ${
            isOpen && !disabled
              ? "ring-2 ring-blue-500 border-blue-500"
              : "border-[#919eab52]"
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${name}-label`}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        aria-controls={isOpen ? dropdownId : undefined}
      >
        <span>{selectedLabel || label || t("accessibility.selectOption")}</span>
        <MdOutlineKeyboardArrowDown
          size={25}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {!disabled && isOpen && (
        <div
          id={dropdownId}
          className="absolute z-50 w-full bg-white rounded-2xl shadow-2xl mt-1 border border-gray-200"
          role="listbox"
          aria-labelledby={buttonId}
        >
          <ul className="py-2 font-extrabold max-h-60 overflow-y-auto">
            {Options.map((option, index) => {
              const optionValue =
                typeof option === "object" ? option.value : option;
              const optionLabel =
                typeof option === "object" ? option.label : option;

              return (
                <li
                  key={index}
                  role="option"
                  aria-selected={selectOption === optionValue}
                  className={`px-5 py-3 cursor-pointer transition-colors duration-200 ${
                    focusedIndex === index
                      ? "bg-blue-50 text-blue-700"
                      : selectOption === optionValue
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-[#919eab34]"
                  }`}
                  onClick={() => handleSelect(optionValue, optionLabel, index)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {optionLabel}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {errors[name] && (
        <p
          id={`${name}-error`}
          className="text-red-500 mt-2"
          role="alert"
          aria-live="polite"
        >
          {errors[name].message}
        </p>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl z-10">
          <SpinnerLoading />
        </div>
      )}
    </div>
  );
};

export default SelectFieldCity;
