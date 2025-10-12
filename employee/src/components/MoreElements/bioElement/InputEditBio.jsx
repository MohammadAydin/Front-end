import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosClose } from "react-icons/io";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";

const InputEditBio = ({ toggleInput, defaultValue, refetch }) => {
  // Using the useTranslation for Translation
  const { t } = useTranslation();

  // Using the useForm hook from react-hook-form
  const { register, handleSubmit } = useForm();

  // Submit function
  const submit = async (data) => {
    try {
      const response = await customFetch.post("/update/bio", {
        bio: data.EditBio,
      });

      toast.success(response?.data?.message);
      refetch();
      toggleInput();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      toggleInput();
    }
  };
  return (
    // A container that holds the component
    <div className="w-[40vw] min-w-[350px] p-3 border-[1px] rounded-[7px] bg-white">
      <div className="flex justify-between mb-2 items-center">
        <p>{t("userProfile.EditBio.title")}</p>
        {/* Close button */}
        <button onClick={() => toggleInput()} className="">
          <IoIosClose className="text-2xl" />
        </button>
      </div>
      {/* Form section */}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col  items-center"
      >
        <textarea
          {...register("EditBio")}
          className="bg-gray-50 border w-full  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={defaultValue}
          id="EditBio"
          rows={7}
        ></textarea>

        <div className="flex justify-between w-full mt-2.5 gap-4  ">
          {/* Close button */}
          <button
            className="w-full bg-white rounded-[5px] border-[1px]"
            onClick={() => toggleInput()}
          >
            {t("userProfile.EditBio.cancel")}
          </button>
          {/* Submit button */}
          <button
            className="w-full bg-secondaryColor text-white rounded-[5px] click"
            type="submit"
          >
            {t("userProfile.EditBio.submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputEditBio;
