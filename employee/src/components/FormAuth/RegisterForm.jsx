import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { createRegisterSchema } from "../../utils/validationSchema";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Translation hook
  const { t } = useTranslation();

  const navigate = useNavigate();
  // Store Password Status Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  // Store password confirmation status, show and hide
  const [showConfirm, setShowConfirm] = useState(false);
  // Store status check box remember password show and hide
  const [isChecked, setIsChecked] = useState(false);

  // Create validation schema with translations
  const schema = createRegisterSchema(t);

  // Connecting the Zod with the Hookform
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Transmission function
  const submit = async (data) => {
    setIsLoading(true);

    try {
      // Sign Up post
      const response = await customFetch.post("/employee/register", {
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      // If the login is successful
      // Print user data in the console
      console.log("Signup response successful:", response.data);

      // Show a pop-up message toast successful registration
      toast.success(response?.data?.message);

      // Emptying form fields
      reset();

      // to Verify
      setTimeout(() => {
        navigate(`/verifyEmail/${data.email}`);
      }, 1500);

      // In case it doesn't work
    } catch (error) {
      // If the verification is incomplete, it goes to the verification

      toast.error(error.response?.data?.message);
      setIsLoading(false);

      try {
        //reset code
        const response = await customFetch.post("/email/request", {
          email: data.email,
        });

        // Print the stored email
        console.log("Email stored in store:", data.email);
        // Heading to verification in one and a half seconds
        setTimeout(() => { }, 1500);
        // If the verification request is unsuccessful
      } catch (error) {
        toast.error(error.response?.data?.message);
        setIsLoading(false);
      }

      // If the error is not related to email
      console.log(
        "SignUp error:",
        // Axios error message or server error message appears
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <>
      {/* start form */}
      <form
        className="inputs flex flex-col  SignUp"
        onSubmit={handleSubmit(submit)}
      >
        {/* Form title */}
        <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-8">
          {t('register.title')}
        </h2>
        <div className="relative input-group mb-2.5">
          {/* firstname field */}
          <input
            {...register("firstname")}
            className="input-control"
            type="text"
            id="firstname"
            placeholder={t('register.firstName.placeholder')}
          />
          {errors && (
            <p className="text-red-500 text-[0.7rem] mt-2">
              {errors?.firstname?.message}
            </p>
          )}
        </div>
        <div className="relative input-group mb-2.5">
          {/* firstname field */}
          <input
            {...register("lastname")}
            className="input-control"
            type="text"
            id="lastname"
            placeholder={t('register.lastName.placeholder')}
          />
          {errors && (
            <p className="text-red-500 text-[0.7rem] mt-2">
              {errors?.lastname?.message}
            </p>
          )}
        </div>
        <div className="relative input-group mb-2.5">
          {/* Email field */}
          <input
            {...register("email")}
            className="input-control"
            type="text"
            id="email"
            placeholder={t('register.email.placeholder')}
          />
          {errors && (
            <p className="text-red-500 text-[0.7rem] mt-2">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="  relative">
          <div className="relative input-group mb-2.5">
            {/* password field */}
            <input
              {...register("password")}
              className="input-control"
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              placeholder={t('register.password.placeholder')}
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
              placeholder={t('register.confirmPassword.placeholder')}
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

        {/* Container with confirmation and password forgetting */}
        <div className="flex justify-between mt-[1px] text-[1vw] pwdForgetting">
          {/* A container containing the confirmation and text field */}
          <div className="check flex gap-1">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              onChange={() => setIsChecked(!isChecked)}
            />

            <label
              className="text-[#194894] ml-1 text-[0.7rem]"
              htmlFor="remember"
            >
              {t('register.termsConditions')}
            </label>
          </div>
        </div>
        <button
          className={`p-2 mt-5 mb-3 ${isChecked ? "bg-amber-600 click" : "bg-gray-400 non-click"
            } ${isLoading ? "bg-gray-400" : "bg-amber-600 "
            } text-white rounded-[10px]`}
          type="submit"
          disabled={!isChecked || isLoading}
        >
          {isLoading ? t('register.loading') : t('register.signupButton')}
        </button>
      </form>
      <div className="flex  text-[0.8rem]">
        <p>{t('register.alreadyHaveAccount')}</p>
        <Link to="/login" className="text-[#F47621] click">
          {t('register.loginLink')}
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
