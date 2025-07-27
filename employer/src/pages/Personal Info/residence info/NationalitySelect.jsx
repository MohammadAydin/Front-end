import React, { useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import handleNationality from "../../../store/HandleNationality";

const NationalitySelect = ({ name, errors, setValue, register, value }) => {
  const { selectedNationality, setSelectedNationality } = handleNationality();
  const options = countryList().getData();

  useEffect(() => {
    if (!value) {
      setSelectedNationality(null);
    }
  }, [value]);

  const handleSelect = (option) => {
    setSelectedNationality(option);
    setValue(name, option?.label || "", { shouldValidate: true });
  };

  return (
    <div className="mb-8">
      <input
        type="hidden"
        {...register(name)}
        value={selectedNationality?.label || ""}
        readOnly
      />

      <Select
        options={options}
        value={selectedNationality}
        onChange={handleSelect}
        placeholder="Nationality"
        isClearable
        classNames={{
          control: ({ isFocused }) =>
            `p-3 border-[1.5px] rounded-xl flex justify-between ${
              selectedNationality ? "text-black" : "text-[#919EAB]"
            } ${isFocused ? "border-[#194894]" : "border-[#919eab52]"}`,
          placeholder: () => "text-[#919EAB]",
          singleValue: () => "text-black",
          menu: () => "z-50",
        }}
      />

      {errors[name] && (
        <p className="text-red-500 mt-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default NationalitySelect;
