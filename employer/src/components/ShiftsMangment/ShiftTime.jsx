const ShiftTime = ({ name, register, errors, timeField, defaultvalue }) => {
  return (
    <div className="flex flex-col">
      <div className="my-5">
        <span>{name}:</span>
        <input
          {...register(timeField)}
          className="w-28 border-2 border-[#e2e2e7] rounded-lg p-2 ml-5"
          type="time" 
          step="60" 
          defaultValue={defaultvalue}
        />
      </div>
      {errors[timeField] && (
        <span className="text-red-500 text-sm">
          {errors[timeField].message}
        </span>
      )}
    </div>
  );
};

export default ShiftTime;
