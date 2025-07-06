import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Wrapper from "../assets/wrapper/Form";
import customFetch from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const FormReset = () => {
  // Store Password Status Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  // Store password confirmation status, show and hide
  const [showConfirm, setShowConfirm] = useState(false);
  // Fetch token and email from the link
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  // Definition of routing
  const navigate = useNavigate();

  // Constraints chart from the Zod Library
  const schema = z
    .object({
      password: z
        .string()
        .min(1, { message: "Bitte geben Sie Ihr Passwort ein!" }),
      passwordConfirm: z.string(),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.passwordConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is not the same as confirm password",
          path: ["confirmPassword"],
        });
      }
    });

  // Connecting the Zod Library to the Hookform
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Transmission function
  const submit = async (data) => {
    try {
      // new password send
      const response = await customFetch.post("/reset-password", {
        token:
          "606650aac3ada0f01696cfb3c908e01023fb6eb5c12f6a8c9bc3afdcc421a7c6",
        email: "yahiaalsatam2024@gmail.com",
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      // If the reset password send is successful
      setTimeout(() => {
        navigate("/Login");
        reset();
      }, 1500);
      // Show reset password success message
      toast.success("reset password successful");
      // Show a successful reset password message
      console.log("reset password  successful:", response.data);

      // In case it doesn't work
    } catch (error) {
      toast.error("reset password error:" + error.response?.data?.message);

      // Print the error message in console
      console.log("reset password  error:", error.response?.data?.message);
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
          <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-4">
            Reset Password
          </h2>
          {/* Forme description */}
          <p className="text-[13px] mb-4 text-[#555770]">
            Enter the new password and then retype it
          </p>
          <div className="relative input-group ">
            {/* password field */}
            <input
              {...register("password")}
              className="input-control"
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              placeholder="new password"
            />
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
            {errors && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="relative input-group ">
            {/* confirm password field */}
            <input
              {...register("passwordConfirm")}
              className="input-control"
              type={`${showConfirm ? "text" : "password"}`}s
              id="passwordConfirm"
              placeholder="Confirm new password"
            />
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
            {errors && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors?.passwordConfirm?.message}
              </p>
            )}
          </div>

          {/* reset button */}
          <button
            className="p-2 mt-2.5  bg-amber-600 text-white rounded-[10px]"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        {/* end form */}
        <div className="flex mt-4 text-[0.8rem]">
          {" "}
          {/* Go to the account creation page */}
          <p>back to Login?</p>
          <Link to="Login" className="text-[#F47621] click">
            Login
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default FormReset;
