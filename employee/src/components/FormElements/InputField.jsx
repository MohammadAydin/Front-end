import { useTranslation } from "react-i18next";

const InputField = ({
  label,
  type,
  register,
  errors,
  name,
  defaultvalue,
  step,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="InputField relative input-group">
          <input
            {...register(name)}
            className="input-control "
            type={type}
            id={name}
            name={name}
            placeholder=""
            defaultValue={defaultvalue && `${defaultvalue}`}
            step={step}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <label
            className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white copy"
            htmlFor={name}
          >
            {label}
          </label>
        </div>
        {errors[name] && (
          <p className="InputErrors text-red-500 mt-3.5 mb-1">
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
