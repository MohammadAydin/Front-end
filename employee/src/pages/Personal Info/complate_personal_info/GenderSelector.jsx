import { Controller } from "react-hook-form";
import { FaMars, FaVenus } from "react-icons/fa6";
import { FaTransgenderAlt } from "react-icons/fa";

const genderOptions = [
  { value: "male", label: "Male", icon: <FaMars /> },
  { value: "female", label: "Female", icon: <FaVenus /> },
  { value: "diverse", label: "Diverse", icon: <FaTransgenderAlt /> },
];

const GenderSelector = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="GenderSelector flex gap-4">
          {genderOptions.map((option) => {
            const isSelected = field.value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => field.onChange(option.value)}
                className={`w-full flex items-center gap-2 border rounded-lg px-5 py-3 font-semibold 
                  ${
                    isSelected
                      ? "border-orange-500 text-orange-500"
                      : "border-gray-200 text-gray-500"
                  }`}
              >
                {option.icon} {option.label}
              </button>
            );
          })}
        </div>
      )}
    />
  );
};

export default GenderSelector;
