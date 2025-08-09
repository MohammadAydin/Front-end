import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Wrapper from "../assets/wrapper/FormStyle/FormLogin";
import useFormLevel from "../store/Formlevel";
import customFetch from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../utils/localStorage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { createLoginSchema } from "../utils/validationSchema";
import { useAuthStore } from "../store/useAuthStore";

const FormLogin = () => {
  // Translation hook
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Storing the state of showing and hiding the password
  const [showPassword, setShowPassword] = useState(false);

  // Storing password remembering status
  const [isChecked, setIsChecked] = useState(false);

  //Form Interface Phase Storage
  const setLevel = useFormLevel((s) => s.setLevel);

  // Storing the account for which a ticket was placed
  const result = localStorage.getItem("account");
  const account = result ? JSON.parse(result) : "";

  // Getting the user and setUser from the store
  const setUser = useAuthStore((state) => state.setUser);
  // Definition of navigate
  const navigate = useNavigate();

  // Create validation schema with translations
  const schema = createLoginSchema(t);

  // Connecting the validation schema to the React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Submit function
  const submit = async (data) => {
    setIsLoading(true);
    try {
      // Login post
      const response = await customFetch.post("/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.data.role == "employer") {
        // If the login is successful
        // If the Remember button saves the account in LocalStorage
        if (isChecked) {
          localStorage.setItem(
            "account",
            JSON.stringify({
              email: data.email,
              password: data.password,
            })
          );
        }

        // Show login success message
        toast.success(t("login.success"));

        // Add user to local storage
        addUserToLocalStorage(response.data?.data);

        // User storage in Zostand store
        setUser(getUserFromLocalStorage());
        setIsLoading(false);
        // Go to the home page
        setTimeout(() => {
          navigate("/");
          reset();
        }, 1500);
      } else {
        toast.error(
          "Sorry, the account you are trying to access does not exist."
        );
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(t("login.error") + ": " + error.response?.data?.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        {/* start form */}
        <form
          className="inputs flex flex-col mt-[30px] login"
          onSubmit={handleSubmit(submit)}
        >
          {/* Form title */}
          <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-8">
            {t("login.title")}
          </h2>

          <div className="relative input-group mb-2.5">
            {/* Email field */}
            <input
              {...register("email")}
              className="input-control"
              type="text"
              id="email"
              placeholder={t("login.email.placeholder")}
              defaultValue={account.email || ""}
            />
            {errors && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors?.email?.message}
              </p>
            )}
          </div>

          {/* Container with input password and icon */}
          <div className="relative">
            <div className="relative input-group mb-2.5">
              {/* Password field */}
              <input
                {...register("password")}
                className="input-control"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("login.password.placeholder")}
                defaultValue={account.password || ""}
              />
              {errors && (
                <p className="text-red-500 text-[0.7rem] mt-2 ">
                  {errors?.password?.message}
                </p>
              )}
              {/* A button to show and hide the password */}
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
          </div>

          {/* Container with confirmation and password forgetting */}
          <div className="flex justify-between mt-[16px] text-[1vw] pwdForgetting">
            {/* A container containing the confirmation and text field */}
            <div className="check flex gap-1">
              <input
                onChange={() => setIsChecked(!isChecked)}
                type="checkbox"
                id="remember"
                name="remember"
              />
              {/* Remember the account */}
              <label className="text-[#194894] ml-1" htmlFor="remember">
                {t("login.rememberPassword")}
              </label>
            </div>
            {/* Go to the password reset page */}
            <Link
              to="/forgetPassword"
              className="text-[#F47621] vergessen underline"
            >
              {t("login.forgotPassword")}
            </Link>
          </div>

          {/* Login button */}
          <button
            className={`p-2 button-login mb-3 ${
              isLoading ? "bg-gray-400" : "bg-amber-600"
            } text-white rounded-[10px]`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Wating ... " : "Login"}
          </button>
        </form>
        {/* end form */}

        <div className="flex mt-4 text-[0.8rem]">
          {/* Go to the account creation page */}
          <p>{t("login.newUser")}</p>
          <p onClick={() => setLevel(2)} className="text-[#F47621] click ml-1">
            {t("login.createAccount")}
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default FormLogin;
