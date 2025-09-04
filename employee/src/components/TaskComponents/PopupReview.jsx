import "../MoreElements/Popup/Popup.css";
import Button from "../MoreElements/Button";
import { IoMdClose } from "react-icons/io";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosStarOutline } from "react-icons/io";
import { GiRoundStar } from "react-icons/gi";
import { PiSmileySadThin } from "react-icons/pi";
import { PiSmileyThin } from "react-icons/pi";
import { LiaSmileBeamSolid } from "react-icons/lia";
import { PiSmileyWinkThin } from "react-icons/pi";
import { CgSmileMouthOpen } from "react-icons/cg";

import { PiSmileyWinkLight } from "react-icons/pi";
import { useState } from "react";

// Pass confirmation props and change the state of the popup
const PopupReview = ({ togglePopup, idTask }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);

  const handleRateNUM = () => {
    if (active5) return 5;
    if (active4) return 4;
    if (active3) return 3;
    if (active2) return 2;
    if (active1) return 1;
    return 0;
  };

  // Storing field values and setting numeric constraints
  const schema = z.object({
    feedback: z.string().min(0).max(200).optional(),
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
      const rate = handleRateNUM();

      const response = await customFetch.post(`/review`, {
        rate: rate,
        feedback: data.feedback,
        task_id: idTask,
      });
      // If successful

      navigate("/tasksPage");
      toast.success("Thank you for rating us");
      // Emptying form fields
      reset();

      // In case it doesn't work
    } catch (error) {
      // Show Toast error message
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>

      <div className="modal-content  flex flex-col items-center rounded-[10px]">
        <p className="mt-8">Your opinion matters! Kindly rate us</p>
        {/* start form */}
        <div className="mt-2.5 mb-3">
          {!active1 && <PiSmileyWinkLight className="text-5xl" />}
          {active1 && !active2 && <PiSmileySadThin className="text-5xl" />}
          {active1 && active2 && !active3 && (
            <PiSmileySadThin className="text-5xl" />
          )}
          {active1 && active2 && active3 && !active4 && (
            <PiSmileyThin className="text-5xl font-light" />
          )}

          {active1 && active2 && active3 && active4 && !active5 && (
            <CgSmileMouthOpen className="text-5xl" />
          )}
          {active1 && active2 && active3 && active4 && active5 && (
            <CgSmileMouthOpen className="text-5xl" />
          )}
        </div>
        <div className="flex justify-around w-full">
          <GiRoundStar
            className={`text-gray-400 text-4xl click ${
              active1 && "text-secondaryColor"
            }`}
            onClick={() => {
              !active2 && setActive1(!active1);
            }}
          />
          <GiRoundStar
            className={`text-gray-400  text-4xl click ${
              active2 && "text-secondaryColor"
            }`}
            onClick={() => {
              active1 && !active3 && setActive2(!active2);
            }}
          />
          <GiRoundStar
            className={`text-gray-400  text-4xl click ${
              active3 && "text-secondaryColor"
            }`}
            onClick={() => {
              active2 && !active4 && setActive3(!active3);
            }}
          />
          <GiRoundStar
            className={`text-gray-400  text-4xl click ${
              active4 && "text-secondaryColor"
            }`}
            onClick={() => {
              active3 && !active5 && setActive4(!active4);
            }}
          />
          <GiRoundStar
            className={`text-gray-400  text-4xl click ${
              active5 && "text-secondaryColor"
            }`}
            onClick={() => {
              active4 && setActive5(!active5);
            }}
          />
        </div>

        <form
          className="inputs flex flex-col mt-[30px] w-full"
          onSubmit={handleSubmit(submit)}
        >
          {/* Fields container */}
          <div className="flex justify-between w-full h-32">
            <textarea
              {...register("feedback")}
              className="border-1 rounded-[5px] w-full h-full focus:outline-none focus:border-secondaryColor p-1.5"
              id="feedback"
              placeholder="Send us any feedback..."
            />
          </div>
          {errors && (
            <p className="mt-4 text-red-600 text-[0.7rem]">
              {errors?.feedback?.message}
            </p>
          )}
          <div className="flex w-[25vw] gap-3.5 mt-8 mb-6 ">
            {/* Cancel modification button */}
            <Button
              onClick={() => navigate("/tasksPage")}
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
        <button className="close-modal" onClick={() => navigate("/tasksPage")}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default PopupReview;
