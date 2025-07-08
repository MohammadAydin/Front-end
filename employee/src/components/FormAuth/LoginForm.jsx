import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Wrapper from "../../assets/wrapper/FormStyle/LoginForm";
// import useFormLevel from "../store/Formlevel";
import customFetch from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
// import { addUserToLocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Getting the user and setUser from the store
  const setUser = useAuthStore((state) => state.setUser);

  // Storing the state of showing and hiding the password
  const [showPassword, setShowPassword] = useState(false);

  // Storing password remembering status
  const [isChecked, setIsChecked] = useState(false);

  // Definition of navigate
  const navigate = useNavigate();

  // Constraints chart from the Zod Library
  const schema = z.object({
    email: z
      .string({ message: "Email address is required." })
      .max(255, { message: "The field must be no longer than 255 characters" })
      .email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "cannot be left empty" }),
  });

  // Connecting the Zod Library to the Hookform
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
      // Login post
      const response = await customFetch.post("/login", {
        email: data.email,
        password: data.password,
      });
      // If the login is successful
      // If the registrar is an employee
      if (response.data.data.role == "employee") {
        // User storage in local storage
        addUserToLocalStorage("user", response.data.data);

        // User storage in Zostand store
        setUser(getUserFromLocalStorage("user"));

        //  User print
        console.log(getUserFromLocalStorage("user"));

        {
          isChecked && addUserToLocalStorage("account", data);
        }
        // Show login success message
        toast.success("Login successful");
        // Show a successful login message with the account
        console.log("Login successful:", response.data);

        // Go to the home page
        setTimeout(() => {
          navigate("/");
          reset();
        }, 1500);
      } else {
        toast.error("This account does not account employee");
      }

      // In case it doesn't work
      // If he is not an employee
    } catch (error) {
      console.log("Login error full:", error);
      toast.error(error?.response?.data?.message);
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
            Log in to Wo & Wann
          </h2>
          <div className="relative input-group mb-2.5">
            {/* Email field */}
            <input
              {...register("email")}
              className="input-control"
              type="text"
              id="email"
              defaultValue={getUserFromLocalStorage("account")?.email || ""}
              placeholder="email address"
              //   defaultValue={account.email || ""}
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
                defaultValue={
                  getUserFromLocalStorage("account")?.password || ""
                }
                placeholder="password"
                // defaultValue={account.password || ""}
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
                Remember Password
              </label>
            </div>
            {/* Go to the password reset page */}
            <Link
              to="/AuthContainer/forgetPassword"
              className="text-[#F47621] vergessen underline"
              href="#"
            >
              Forgot Password?
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
            {isLoading ? "Waiting .. " : "Login"}
          </button>
        </form>
        {/* end form */}
        <div className="flex mt-4 text-[0.8rem]">
          {" "}
          {/* Go to the account creation page */}
          <p>New user?</p>
          <Link to="/AuthContainer/register" className="text-[#F47621] click">
            Create an account
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default LoginForm;
