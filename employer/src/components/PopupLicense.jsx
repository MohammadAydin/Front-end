import React from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PopupLicense = ({ setPopupLicense }) => {
  // Creating a schema for constraints
  const schema = z.object({
    file: z
      .instanceof(File)
      .refine((file) => file.type === "application/pdf", {
        message: "Only PDF files are allowed.",
      })
      .refine((file) => file.size > 0, {
        message: "Please upload a PDF file.",
      }),
  });
  // Connecting the schema with the hookForm library
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data) => {
    setPopupLicense(false);
  };
  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="Popup bg-white w-[90%] max-w-lg h-fit p-3.5 rounded-2xl">
        <div className="flex justify-between mb-4 ">
          <p>Edit About</p>
          {/* Close popup button */}
          <IoClose className="click" onClick={() => setPopupLicense(false)} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative input-group mb-1.5">
            {/* Document Name Type Field */}
            <input
              {...register("nameDocument")}
              className="input-control"
              type="text"
              id="nameDocument"
              placeholder="Document Name"
            />
          </div>
          {/* Container containing the document upload box */}
          <label
            htmlFor="file"
            className="flex flex-col click Upload-License bg-[#919EAB33] p-5 rounded-2xl mb-11 mt-5"
          >
            <p>Upload files</p>
            <span className="text-[0.6rem] text-[#555770]">
              Drop files here or click{" "}
              <span className="text-[#F47621]">browse</span> thorough your
              machine
            </span>
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            {...register("file")}
          />{" "}
          {errors && (
            <p className="text-red-500 text-[0.7rem] mt-2">
              {errors?.file?.message}
            </p>
          )}
          {/* Shutdown button */}
          <div className="flex justify-end gap-0.5 mt-2.5">
            <button
              onClick={() => setPopupLicense(false)}
              type="button"
              className="text-gray-900 bg-[#F1F1F5] border border-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2"
            >
              Cancel
            </button>
            {/* Save button */}
            <button
              type="submit"
              className="text-white bg-[#f47621] font-medium rounded-lg text-sm px-5 mb-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupLicense;
