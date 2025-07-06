const RadioGroupField = ({ label, name, options, register, error }) => (
  <div className="border-b border-[#919eab63] border-dashed pb-5">
    <h2 className="font-bold mb-5">{label}</h2>
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2">
          <input type="radio" value={opt.value} {...register(name)} />
          {opt.label}
        </label>
      ))}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  </div>
);

export default RadioGroupField;
