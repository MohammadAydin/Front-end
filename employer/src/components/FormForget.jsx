import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Wrapper from "../assets/wrapper/Form";
import customFetch from "../utils/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FormForget = () => {
  // Store the state of the send code button
  const [isSend, setIsSend] = useState(false);

  // Constraints chart from the Zod Library
  const schema = z.object({
    email: z
      .string({ message: "Email address is required." })
      .max(255, { message: "The field must be no longer than 255 characters" })
      .email({ message: "Please enter a valid email address." }),
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
      toast.success(response.data.message);
      // Show a successful login message with the account
      // Emptying form fields
      reset();

      // In case it doesn't work
    } catch (error) {
      toast.error("send email Login :" + error.response?.data?.message);

      // Print the error message in console
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
            forget Password
          </h2>
          {/* Forme description */}
          <p className="text-[13px] mb-4 text-[#555770]">
            You will receive an email to your email address to reset your
            password
          </p>
          <div className="relative input-group ">
            {/* Email field */}
            <input
              {...register("email")}
              className="input-control"
              type="text"
              id="email"
              placeholder="email address"
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
            className={`p-2 mt-2.5 ${
              isSend ? "bg-gray-700 pointer-events-none" : " bg-amber-600"
            }  text-white rounded-[10px]`}
            type="submit"
          >
            Send Email
          </button>
        </form>
        {/* end form */}
        <div className="flex mt-4 text-[0.8rem]">
          {" "}
          {/* Go to the account creation page */}
          <p>back to Login?</p>
          <Link to="/login" className="text-[#F47621] click">
            Login
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default FormForget;
