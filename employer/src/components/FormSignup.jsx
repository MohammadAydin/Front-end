import { useState } from "react";
import { IoIosCloseCircleOutline, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Wrapper from "../assets/wrapper/FormStyle/FormSignUp";
import useFormLevel from "../store/Formlevel";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import useEmailStore from "../store/storeEmail";
import { CiCircleCheck } from "react-icons/ci";

const FormSignup = () => {
  const [isFocused, setIsFocused] = useState(false);

  // Form level storage
  const setLevel = useFormLevel((s) => s.setLevel);
  // Storing the generated email
  const setEmail = useEmailStore((s) => s.setEmail);

  // Store Password Status Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  // Store password confirmation status, show and hide
  const [showConfirm, setShowConfirm] = useState(false);
  // Store status check box remember password show and hide
  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Constraints chart from the Zod Library
  const schema = z
    .object({
      name: z.string().min(1, { message: "Bitte geben Sie Ihre names ein!" }),
      email: z
        .string()
        .min(1, { message: "Bitte geben Sie Ihre E-Mail-Adresse ein!" })
        .email({ message: "Please enter a valid email address." }),
      password: z
        .string()
        .min(1, { message: "Bitte geben Sie Ihr Passwort ein!" }),
      confirmPassword: z.string(),
    })

    // To compare password and password confirmation
    .superRefine((val, ctx) => {
      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is not the same as confirm password",
          path: ["confirmPassword"],
        });
      }
    });

  // Connecting the Zod with the Hookform
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Transmission function
  const submit = async (data) => {
    setIsLoading(true);
    try {
      // Sign Up post
      const response = await customFetch.post("/employer/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      // If the login is successful
      // Print user data in the console
      // Store email to send to verification
      setEmail(data.email);
      // Print the stored email
      // Show a pop-up message toast successful registration
      toast.success("Signup account successful");
      setIsLoading(false);
      // Emptying form fields
      reset();

      // to Verify
      setTimeout(() => {
        setLevel(3);
      }, 1500);

      // In case it doesn't work
    } catch (error) {
      toast.error(error.response?.data?.message);
      // If the verification is incomplete, it goes to the verification
      setIsLoading(false);
      if (
        error.response?.data?.message == "The email has already been taken."
      ) {
        toast.error(
          "The email has already been taken. please Verify your email"
        );
        try {
          //reset code
          const response = await customFetch.post("/email/request", {
            email: data.email,
          });
          // Store email to send to verification
          setEmail(data.email);
          // Print the stored email
          // Heading to verification in one and a half seconds
          setTimeout(() => {
            setLevel(3);
          }, 1500);
          // If the verification request is unsuccessful
        } catch {}
      }
      // If the error is not related to email
    }
  };
  const passwordValue = watch("password");

  return (
    <Wrapper>
      {/* start form */}
      <form
        className="inputs flex flex-col  SignUp"
        onSubmit={handleSubmit(submit)}
      >
        {/* Form title */}
        <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-8">
          Sign up to Wo & Wann
        </h2>
        <div className="relative input-group mb-2.5">
          {/* name field */}
          <input
            {...register("name")}
            className="input-control"
            type="text"
            id="name"
            placeholder="Elderly House name"
          />
          {errors && (
            <p className="text-red-500 text-[0.7rem] mt-2">
              {errors?.name?.message}
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
            placeholder="Email Address"
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
              placeholder="Password"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <div
              className={`transition-opacity duration-300 ease-in-out ${
                isFocused
                  ? "opacity-100 max-h-96"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <p className="text-[12px] mt-1 text-gray-500 flex items-center gap-1">
                Password must be at least 8 characters long.{" "}
                {passwordValue?.length >= 8 ? (
                  <CiCircleCheck className="text-green-600 font-bold text-2xl" />
                ) : (
                  <IoIosCloseCircleOutline className="text-red-500 text-2xl" />
                )}
              </p>

              <p className="text-[12px] mt-1 text-gray-500 flex items-center gap-1">
                Password must contain at least one symbol (e.g., !@#$%).{" "}
                {/[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\\\|\<\>\,\.\?\/]/.test(
                  passwordValue
                ) ? (
                  <CiCircleCheck className="text-green-600 font-bold text-2xl" />
                ) : (
                  <IoIosCloseCircleOutline className="text-red-500 text-2xl" />
                )}
              </p>
              <p className="text-[12px] mt-1 text-gray-500 flex items-center gap-1">
                Password must contain at least one uppercase and one lowercase
                letter.{" "}
                {/(?=.*[a-z])(?=.*[A-Z])/.test(passwordValue) ? (
                  <CiCircleCheck className="text-green-600 font-bold text-2xl" />
                ) : (
                  <IoIosCloseCircleOutline className="text-red-500 text-2xl" />
                )}
              </p>
            </div>
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
              placeholder="Confirm New Password"
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
              Agree to Terms & Conditions of wo & wann
            </label>
          </div>
        </div>
        <button
          className={`p-2 mt-5 mb-3 ${
            isChecked && !isLoading
              ? "bg-amber-600 click"
              : "bg-gray-400 non-click"
          }  text-white rounded-[10px]`}
          type="submit"
          disabled={!isChecked || isLoading}
        >
          {!isLoading ? "Sign Up" : "Wating ... "}
        </button>
      </form>
      <div className="flex  text-[0.8rem]">
        <p>Already have an account?</p>
        <p onClick={() => setLevel(1)} className="text-[#F47621] click">
          Log in
        </p>
      </div>
    </Wrapper>
  );
};

export default FormSignup;
