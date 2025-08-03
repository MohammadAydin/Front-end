import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { createResetPasswordSchema } from "../../utils/validationSchema";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  // Translation hook
  const { t } = useTranslation();

  // Get token and email from the Url
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // Store Password Status Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  // Store password confirmation status, show and hide
  const [showConfirm, setShowConfirm] = useState(false);

  // Store the state of the send code button
  const [isSend, setIsSend] = useState(false);

  // Create validation schema with translations
  const schema = createResetPasswordSchema(t);

  // Connecting the Zod Library to the Hookform
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Transmission function
  const submit = async (data) => {
    try {
      // email send
      const response = await customFetch.post("/reset-password", {
        token: token,
        email: email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      // If the email send is successful
      setIsSend(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      setTimeout(() => {
        setIsSend(false);
      }, 15 * 60 * 1000);
      // Show login success message
      toast.success(response?.data?.message || t('resetPassword.success'));
      // Show a successful login message with the account
      // Emptying form fields
      reset();

      // In case it doesn't work
    } catch (error) {
      toast.error(error.response?.data?.message || t('resetPassword.error'));

      // Print the error message in console
    }
  };
  return (
    <>
      {/* start form */}
      <form
        className="inputs flex flex-col mt-[30px] login"
        onSubmit={handleSubmit(submit)}
      >
        {/* Form title */}
        <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-4">
          {t('resetPassword.title')}
        </h2>
        {/* Forme description */}
        <p className="text-[13px] mb-4 text-[#555770]">
          {t('resetPassword.description')}
        </p>
        <div className="  relative">
          <div className="relative input-group mb-3.5">
            {/* password field */}
            <input
              {...register("password")}
              className="input-control"
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              placeholder={t('resetPassword.password.placeholder')}
            />
            {errors && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <button
            type="button"
            className="absolute top-3 right-4 text-[23px] icon-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoMdEye color="#637381" />
            ) : (
              <IoMdEyeOff color="#637381" />
            )}
          </button>
        </div>
        <div className="  relative">
          <div className="relative input-group mb-2.5">
            {/* confirmPassword field */}
            <input
              {...register("confirmPassword")}
              className="input-control"
              type={`${showConfirm ? "text" : "password"}`}
              id="confirmPassword"
              placeholder={t('resetPassword.confirmPassword.placeholder')}
            />
            {errors && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="button"
            className="absolute top-3 right-4 text-[23px] icon-eye"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? (
              <IoMdEye color="#637381" />
            ) : (
              <IoMdEyeOff color="#637381" />
            )}
          </button>
        </div>

        {/* Login button */}
        <button
          disabled={isSend}
          className={`p-2 mt-2.5 ${isSend ? "bg-gray-700 pointer-events-none" : " bg-amber-600"
            }  text-white rounded-[10px]`}
          type="submit"
        >
          {t('resetPassword.resetButton')}
        </button>
      </form>
      {/* end form */}
    </>
  );
};

export default ResetPasswordForm;
