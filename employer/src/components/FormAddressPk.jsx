import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Wrapper from "../assets/wrapper/FormStyle/FormAddressPk";
import useFormLevel from "../store/Formlevel";
const FormAddressPk = () => {
  const setLevel = useFormLevel((s) => s.setLevel);

  // Definition of a constraint setting scheme
  const schema = z.object({
    Country: z.string().min(1, { message: "Please enter your country!" }),
    City: z.string().min(1, { message: "Please enter your city!" }),
    Street: z.string().min(1, { message: "Please enter your street address!" }),
    code: z.number().min(1, { message: "Please enter a valid postal code!" }),
  });

  // Connecting the schema with the hook-zod-form library
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submit = (data) => {
    // here we will send data to backend when they finish !
    reset();
    setLevel(6);
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
            Add primary address{" "}
          </h2>
          {/* Form description */}
          <p className="text-[0.6rem] mb-7 text-[#555770]">
            Give us your information to keep going to your account.{" "}
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="relative input-group mb-0.5">
              {/* Country field */}
              <input
                {...register("Country")}
                className="input-control"
                type="text"
                id="Country"
                placeholder="Country"
              />
              {errors && (
                <p className="text-red-500 text-[0.7rem] mt-2">
                  {errors?.Country?.message}
                </p>
              )}
            </div>
            <div className="relative input-group mb-0.5">
              {/* City field */}
              <input
                {...register("City")}
                className="input-control"
                type="text"
                id="City"
                placeholder="City"
              />
              {errors && (
                <p className="text-red-500 text-[0.7rem] mt-2">
                  {errors?.City?.message}
                </p>
              )}
            </div>
            <div className="relative input-group mb-0.5">
              {/* Street field */}
              <input
                {...register("Street")}
                className="input-control"
                type="text"
                id="Street"
                placeholder="Street name, House number"
              />
              {errors && (
                <p className="text-red-500 text-[0.7rem] mt-2">
                  {errors?.Street?.message}
                </p>
              )}
            </div>
            <div className="relative input-group mb-0.5">
              {/* code field */}
              <input
                {...register("code", { valueAsNumber: true })}
                className="input-control"
                type="text"
                id="code"
                placeholder="code"
              />
              {errors && (
                <p className="text-red-500 text-[0.7rem] mt-2">
                  {errors?.code?.message}
                </p>
              )}
            </div>
          </div>
          {/* Back to the main address page */}
          <div className="flex gap-3.5 justify-center">
            <button
              onClick={() => setLevel(4)}
              className="p-2 w-[40%] border-amber-500 border-2 button-login mb-3 text-white bg-amber-600 rounded-[10px]"
              type="submit"
            >
              Back
            </button>
            <button
              className="p-2 w-[40%]  button-login mb-3 bg-amber-600 text-white rounded-[10px]"
              type="submit"
            >
              Continue{" "}
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default FormAddressPk;
