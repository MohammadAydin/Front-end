import { useForm } from "react-hook-form";
import { useState } from "react";
import fileUploadSchema from "./fileUploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import FileUploader from "../../../components/FormElements/FileUploader";
import { IoClose, IoDocumentTextOutline } from "react-icons/io5";

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
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm animate-slide-up p-4">
          <form
            onSubmit={handleSubmit(Submit)}
            className="DocumentsForm w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto animate-slide-up"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-t-2xl p-6 relative">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                  <IoDocumentTextOutline className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-xl text-white">Upload Document</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
                className="absolute top-6 right-6 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300"
                aria-label="Close"
              >
                <IoClose className="text-white" size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <FileUploader
                name={"document"}
                label={"Upload Document"}
                register={register}
                setValue={setValue}
                error={errors}
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              <SubmitButtons
                onCancel={() => {
                  setIsOpen(false);
                  reset();
                }}
                submitLabel="Upload"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadDocs;
