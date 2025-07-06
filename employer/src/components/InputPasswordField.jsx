import { useState } from "react";
import InputField from "./InputField";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const InputPasswordField = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="InputPasswordField relative col-span-2">
      <InputField
        label={"Passwort"}
        type={showPassword ? "text" : "password"}
        register={register}
        errors={errors}
        name={"password"}
      />
      <button
        type="button"
        className={`absolute translate-y-[-50%] right-4 text-[23px] icon-eye ${
          errors?.password ? "top-[30%]" : "top-[50%]"
        }`}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <IoMdEye color="#637381" />
        ) : (
          <IoMdEyeOff color="#637381" />
        )}
      </button>
    </div>
  );
};

export default InputPasswordField;
