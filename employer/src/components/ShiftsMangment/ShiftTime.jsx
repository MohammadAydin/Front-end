import { LuClock } from "react-icons/lu";

const ShiftTime = ({ name, register, errors, timeField, defaultvalue }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {name}:
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <LuClock size={18} />
        </div>
        <input
          {...register(timeField)}
          className="w-full border-2 border-gray-200 rounded-lg p-3 pl-10 focus:border-[#F47621] focus:ring-2 focus:ring-[#F47621]/20 transition-all duration-300 outline-none"
          type="time"
          step="60"
          defaultValue={defaultvalue}
        />
      </div>
      {errors[timeField] && (
        <span className="text-red-500 text-sm mt-1 block">
          {errors[timeField].message}
        </span>
      )}
    </div>
  );
};

export default ShiftTime;
