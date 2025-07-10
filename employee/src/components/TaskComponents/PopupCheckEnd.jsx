import "../MoreElements/Popup/Popup.css";
import Button from "../MoreElements/Button";
import { IoMdClose } from "react-icons/io";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

// Pass confirmation props and change the state of the popup
const PopupCheckEnd = ({ togglePopup, idTask, setIsEnd, setisCheckArrived }) => {
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
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Field dispatch function
  const submit = async (data) => {
    // Merge fields into a single field
    const code = Object.values(data).join("");

    // Send Verification Request
    try {
      const response = await customFetch.post(
        `/employee/qr/end/${idTask}/${code}`
      );
      // If successful

      console.log(response.data);
      toast.success("Access has been verified");

      // If the Verify is successful
      // Print user data in the console
      console.log("Access has been verified:", response.data);
      togglePopup();
      setIsEnd(true);
      setisCheckArrived(false);
      // Emptying form fields
      reset();

      // In case it doesn't work
    } catch (error) {
      // Show Toast error message
      toast.error(error?.response?.data?.message);

      // Print the error message in console
      console.log(
        "Verify error:",
        // Axios error message or server error message appears
        error.response?.data?.message
      );
    }
  };

  // Handle paste event to distribute code across fields
  const handlePaste = (e, fieldIndex) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, ""); // Remove non-digits
    if (pastedData.length >= 6) {
      // Distribute the first 6 digits to the fields
      setValue("code1", parseInt(pastedData[0]));
      setValue("code2", parseInt(pastedData[1]));
      setValue("code3", parseInt(pastedData[2]));
      setValue("code4", parseInt(pastedData[3]));
      setValue("code5", parseInt(pastedData[4]));
      setValue("code6", parseInt(pastedData[5]));
      // Focus on the last field
      document.getElementById("code6").focus();
    }
  };

  // Handle input change to move focus to the next field
  const handleChange = (e, currentField, nextField) => {
    const value = e.target.value;
    if (value.length === 1 && nextField) {
      document.getElementById(nextField).focus();
    }
  };

  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>
      <div className="modal-content  flex flex-col items-center rounded-[10px]">
        <p className="mt-8">Manual scanner number entry</p>
        {/* start form */}
        <form
          className="inputs flex flex-col mt-[30px] w-full"
          onSubmit={handleSubmit(submit)}
        >
          {/* Fields container */}
          <div className="flex justify-between w-full">
            <input
              {...register("code1", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code1"
              maxLength={1}
              onPaste={(e) => handlePaste(e, 1)}
              onChange={(e) => handleChange(e, "code1", "code2")}
            />
            <input
              {...register("code2", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code2"
              maxLength={1}
              onPaste={(e) => handlePaste(e, 1)}
              onChange={(e) => handleChange(e, "code2", "code3")}
            />
            <input
              {...register("code3", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code3"
              maxLength={1}
              onPaste={(e) => handlePaste(e, 1)}
              onChange={(e) => handleChange(e, "code3", "code4")}
            />
            <input
              {...register("code4", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code4"
              maxLength={1}
              onPaste={(e) => handlePaste(e, 1)}
              onChange={(e) => handleChange(e, "code4", "code5")}
            />
            <input
              {...register("code5", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code5"
              maxLength={1}
              onPaste={(e) => handlePaste(e, 1)}
              onChange={(e) => handleChange(e, "code5", "code6")}
            />
            <input
              {...register("code6", { valueAsNumber: true })}
              className="input-control-code"
              type="text"
              id="code6"
              maxLength={1}
              onPaste={(e) => handlePaste(e, 1)}
            />
          </div>
          {errors && (
            <p className="mt-4 text-red-600 text-[0.7rem]">
              {errors?.code1?.message}
            </p>
          )}
          <div className="flex w-[25vw] gap-3.5 mt-8 mb-6 ">
            {/* Cancel modification button */}
            <Button
              onClick={togglePopup}
              className="bg-softwhite border   p-2 rounded-[10px] w-full"
              text="Cancel"
            />
            {/* Submit confirmation button */}

            <button
              className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full"
              type="submit"
            >
              {" "}
              Send
            </button>
          </div>
        </form>
        <button className="close-modal" onClick={togglePopup}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default PopupCheckEnd;
