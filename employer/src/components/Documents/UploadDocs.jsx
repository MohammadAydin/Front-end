import { useForm } from "react-hook-form";
import { useState } from "react";
import fileUploadSchema from "./fileUploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButtons from "../FormElements/SubmitButtons";

const FileUploadForm = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fileUploadSchema),
  });

  const [fileName, setFileName] = useState("");

  const onSubmit = (data) => {
    setIsOpen(false);
    resetForm();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setValue("document", file, { shouldValidate: true });
      setFileName(file.name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("document", file, { shouldValidate: true });
      setFileName(file.name);
    }
  };
  const resetForm = () => {
    reset();
    setFileName("");
  };

  return (
    <>
      {isOpen && (
        <div className=" w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="DocumentsForm w-[600px] h-[600px] bg-white rounded-2xl p-7 flex flex-col justify-between"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div>
              <h2 className="text-xl font-bold">Add The First Document</h2>
              <label
                htmlFor="document"
                className="cursor-pointer p-1 w-full h-[150px] bg-[#919eab46] rounded-xl my-8 flex flex-col items-center justify-center text-center"
              >
                {fileName ? (
                  <div>{fileName}</div>
                ) : (
                  <div>
                    <span className="text-xl font-bold mb-2">
                      Upload Document
                    </span>
                    <p>
                      Drop files here or click
                      <span className="text-[#EE6000]"> browse </span> thorough
                      your device
                    </p>
                  </div>
                )}
              </label>
              <input
                id="document"
                type="file"
                className="hidden"
                {...register("document")}
                onChange={handleFileChange}
              />
              {errors.document && (
                <p className="text-red-500 text-center mt-1">
                  {errors.document.message}
                </p>
              )}
            </div>
            <SubmitButtons
              onCancel={() => {
                setIsOpen(false);
                resetForm();
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default FileUploadForm;
