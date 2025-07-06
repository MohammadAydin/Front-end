import { useForm } from "react-hook-form";
import { useState } from "react";
import fileUploadSchema from "./fileUploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import FileUploader from "../../../components/FormElements/FileUploader";

const UploadDocs = ({
  isOpen,
  setIsOpen,
  setDocuments,
  setIsUploading,
  document_id,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fileUploadSchema),
  });

  const Submit = (data) => {
    setIsOpen(false);
    setIsUploading(data.document.name);
    setDocuments((prev) => ({
      ...prev,
      [document_id]: data.document,
    }));
  };

  return (
    <>
      {isOpen && (
        <div className="w-full z-50 h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <form
            onSubmit={handleSubmit(Submit)}
            className="DocumentsForm w-[600px] h-[600px] bg-white rounded-2xl p-7 flex flex-col justify-between"
          >
            <FileUploader
              name={"document"}
              label={"Upload Document"}
              register={register}
              setValue={setValue}
              error={errors}
            />
            <SubmitButtons
              onCancel={() => {
                setIsOpen(false);
                reset();
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default UploadDocs;
