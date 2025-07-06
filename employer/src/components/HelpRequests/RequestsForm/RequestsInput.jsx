import React from "react";

const RequestsInput = ({ label, type, register, errors, name }) => {
  return (
    <div className="mt-5 w-full">
      <label className=" font-extrabold text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name)}
        className="w-full p-4 my-2 border border-[#919EAB] rounded-2xl  focus:outline-[#919EAB] "
        type={type}
        id={name}
        name={name}
        placeholder={name}
      />

      {errors[name] && <p className="text-red-500 ">{errors[name].message}</p>}
    </div>
  );
};

export default RequestsInput;
