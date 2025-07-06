import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosArrowBack } from "react-icons/io";
import Wrapper from "../assets/wrapper/FormStyle/FormVerify";
import useFormLevel from "../store/Formlevel";
import useEmailStore from "../store/storeEmail";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { addUserToLocalStorage } from "../utils/localStorage";

const FormVerify = () => {
  // Store the state of the resend button
  const [isVerify, setIsVerify] = useState(false);

  // Fetching the Form Level
  const setLevel = useFormLevel((s) => s.setLevel);

  // Fetch stored email
  const email = useEmailStore((s) => s.email);

  // Print the stored email when a change occurs
  useEffect(() => {
    console.log("Email has been updated to:", email);
  }, [email]);

  // Storing field values and setting numeric constraints
  const schema = z.object({
    code1: z.number().min(0).max(9, { message: "Enter a 1-digit number" }),
    code2: z.number().min(0).max(9),
    code3: z.number().min(0).max(9),
    code4: z.number().min(0).max(9),
    code5: z.number().min(0).max(9),
    code6: z.number().min(0).max(9),
  });

  // Definition of Hookform and how it relates to zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Field dispatch function
  const submit = async (data) => {
    // Merge fields into a single field
    const code = Object.values(data).join("");

    // Send Verification Request
    try {
      const response = await customFetch.post("/email/confirm", {
        email: email,
        verification_code: code,
      });
      // If successful, the account is added to LocalStorage
      addUserToLocalStorage(response.data.data);

      toast.success("Verify successful");

      // If the Verify is successful
      // Print user data in the console
      console.log("Verify successful:", response.data);

      // Emptying form fields
      reset();

      // Going to the Form is the last step.
      setLevel(4);

      // In case it doesn't work
    } catch (error) {
      // Show Toast error message
      toast.error(error.response?.data?.message);

      // Print the error message in console
      console.log(
        "Verify error:",
        // Axios error message or server error message appears
        error.response?.data?.message
      );
    }
  };
  // ResendCode function
  const ResendCode = async () => {
    try {
      const response = await customFetch.post("/email/request", {
        email: email,
      });
      // If successful
      // Verification button status mode true
      setIsVerify(true);
      // Show a reminder of the retransmission time
      toast.success("Wait 15 minutes to request the code again");
      // False retransmission status after 15 minutes
      setTimeout(() => {
        setIsVerify(false);
      }, 15 * 60 * 1000);
      // If unsuccessful, an error message appears
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
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
          <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-2.5">
            Verify your email !
          </h2>
          {/* Forme description */}
          <p className="text-[13px] mb-8 text-[#555770]">
            We've emailed a 6-digit confirmation code to {email}, please enter
            the code in below box to verify your email.
          </p>
          {/* Fields container */}
          <div className="flex justify-between">
            <input
              {...register("code1", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code1"
            />
            <input
              {...register("code2", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code2"
            />
            <input
              {...register("code3", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code3"
            />
            <input
              {...register("code4", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code4"
            />
            <input
              {...register("code5", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code5"
            />
            <input
              {...register("code6", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code6"
            />
          </div>
          {errors && (
            <p className="mt-4 text-red-600 text-[0.7rem]">
              {errors?.code1?.message}
            </p>
          )}
          {/* Verification button */}
          <button
            className="p-2 button-login mb-3 bg-[#F47621] text-white rounded-[10px]"
            type="submit"
          >
            Verify
          </button>
        </form>

        <div className="flex mt-4 text-[0.8rem] justify-center">
          {/* Resend Code button */}
          <p>Don’t have a code? </p>
          <button
            disabled={isVerify}
            onClick={ResendCode}
            className={`${
              isVerify ? "text-gray-700" : "text-[#F47621] click"
            } click`}
          >
            Resend code
          </button>
        </div>
        {/* The button to go to the login page */}
        <button
          onClick={() => setLevel(1)}
          className="text-[0.8rem] mt-3.5 flex justify-center items-center"
        >
          <IoIosArrowBack />
          Return to Sign in
        </button>
      </Wrapper>
    </>
  );
};

export default FormVerify;
