import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { z } from "zod";

const PopupNumber = ({ onClose, number, codeNumber }) => {
  const schema = z.object({
    code1: z.number().min(0).max(9, { message: "Enter a 1-digit number" }),
    code2: z.number().min(0).max(9),
    code3: z.number().min(0).max(9),
    code4: z.number().min(0).max(9),
    code5: z.number().min(0).max(9),
    code6: z.number().min(0).max(9),
  });
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submit = async (data) => {
    const code = Object.values(data).join("");
    try {
      console.log(email);
      // Login post
      const response = await customFetch.post("/phone/confirm", {
        dialing_code: codeNumber,
        phone: number,
        verification_code: code,
      });
      onClose(false);

      // If the login is successful
      // Print user data in the console
      // toast.success("create account successful");
      //   console.log("Verify successful:", response.data);
      //   // Emptying form fields
      //   reset();
      //   setLevel(4);
      // In case it doesn't work
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);

      // Print the error message
      console.log(
        "Verify error:",
        // Axios error message or server error message appears
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="Popup bg-white  max-w-lg h-fit p-3.5 rounded-2xl">
        <div className="flex justify-between mb-4 ">
          <p>Enter code</p>
          <IoClose className="click" onClick={() => onClose(false)} />
        </div>
        <form
          className="inputs flex flex-col mt-[30px] login"
          onSubmit={handleSubmit(submit)}
        >
          {/* Form title */}
          <h2 className="formTitle text-center font-bold text-[2.4vw] mt-6 text-[#28293D] mb-2.5">
            Enter code
          </h2>
          {/* Forme description */}
          <p className="text-[13px]  text-center mb-8 text-[#555770]">
            A verification code will be sent to your phone. Please share it.
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
      </div>
    </div>
  );
};

export default PopupNumber;
