const ShiftTime = ({ name, register, errors, timeField, PeriodField,defaultvalue }) => {
  console.log(defaultvalue)
  return (
    <div className="flex flex-col">
      <div className="my-5">
        <span>{name}:</span>
        <input
          {...register(timeField)}
          className="w-20 border-2 border-[#e2e2e7] rounded-lg p-2 ml-5"
          type="text"
          placeholder="HH:MM"
          defaultValue={defaultvalue}
        />

        <select
          {...register(PeriodField)}
          className="p-2 mx-3 focus:outline-[#e2e2e7] border-2 border-[#e2e2e7] rounded-lg text-[#919EAB]"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
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
