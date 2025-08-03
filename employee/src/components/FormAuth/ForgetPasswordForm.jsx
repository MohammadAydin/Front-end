import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import customFetch from "../../utils/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { createForgotPasswordSchema } from "../../utils/validationSchema";

const ForgetPasswordForm = () => {
  // Store the state of the send code button
  const [isSend, setIsSend] = useState(false);

  // Translation hook
  const { t } = useTranslation();

  // Create validation schema with translations
  const schema = createForgotPasswordSchema(t);

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
      const response = await customFetch.post("/forgot-password", {
        email: data.email,
      });
      // If the email send is successful
      setIsSend(true);
      setTimeout(() => {
        setIsSend(false);
      }, 15 * 60 * 1000);
      // Show login success message
      toast.success(response.data.message || t('forgotPassword.success'));
      // Show a successful login message with the account
      // Emptying form fields
      reset();

      // In case it doesn't work
    } catch (error) {
      toast.error(error.response?.data?.message || t('forgotPassword.error'));

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
          {t('forgotPassword.title')}
        </h2>
        {/* Forme description */}
        <p className="text-[13px] mb-4 text-[#555770]">
          {t('forgotPassword.description')}
        </p>
        <div className="relative input-group ">
          {/* Email field */}
          <input
            {...register("email")}
            className="input-control"
            type="text"
            id="email"
            placeholder={t('forgotPassword.email.placeholder')}
          />
          {errors && (
            <p className="text-red-500 text-[0.7rem] mt-2">
              {errors?.email?.message}
            </p>
          )}
        </div>

        {/* Login button */}
        <button
          disabled={isSend}
          className={`p-2 mt-2.5 ${isSend ? "bg-gray-700 pointer-events-none" : " bg-amber-600"
            }  text-white rounded-[10px]`}
          type="submit"
        >
          {t('forgotPassword.sendButton')}
        </button>
      </form>
      {/* end form */}
      <div className="flex mt-4 text-[0.8rem]">
        {" "}
        {/* Go to the account creation page */}
        <p>{t('forgotPassword.backToLogin')}</p>
        <Link to="/login" className="text-[#F47621] click">
          {t('forgotPassword.loginLink')}
        </Link>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
