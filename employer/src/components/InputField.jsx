import React from "react";

const InputField = ({ label, type, register, errors, name }) => {
  return (
    <>
      <div className="InputField relative input-group">
        <input
          {...register(name)}
          className="input-control"
          type={type}
          id={name}
          name={name}
          placeholder=""
        />
        <label
          className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      {errors[name] && (
        <p className="InputErrors text-red-500 mt-2">{errors[name].message}</p>
      )}
    </>
  );
};

export default InputField;
