import { useTranslation } from "react-i18next";

const InputField = ({ label, type, register, errors, name, defaultvalue }) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="InputField relative input-group">
          <input
            {...register(name)}
            className={`input-control ${!label ? '!p-4 !border-2 !border-gray-200 !rounded-xl !bg-white focus:!outline-none focus:!ring-2 focus:!ring-[#F47621] focus:!border-[#F47621] !transition-all !duration-300 placeholder:!text-gray-400 !text-gray-900' : ''}`}
            type={type}
            id={name}
            name={name}
            placeholder={label || ""}
            defaultValue={defaultvalue && `${defaultvalue}`}
          />
          {label && (
            <label
              className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white copy"
              htmlFor={name}
            >
              {label}
            </label>
          )}
        </div>
        {errors[name] && (
          <p className="InputErrors text-red-500 mt-3.5 mb-1 flex items-center gap-1">
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
