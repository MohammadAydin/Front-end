import React from "react";

const BirthCertificateInput = ({
  index,
  register,
  setValue,
  watch,
  errors,
}) => {
  const fileList = watch(`children_documents.${index}`);

  const handleRemoveFile = () => {
    setValue(`children_documents.${index}`, null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-3.5">
      {fileList && fileList.length > 0 ? (
        <div className="flex flex-col items-center gap-2">
          {fileList[0].type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(fileList[0])}
              alt="Preview"
              className="w-48 h-48 object-contain mb-2"
            />
          ) : (
            <a
              href={URL.createObjectURL(fileList[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mb-2"
            >
              {fileList[0].name}
            </a>
          )}
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 border px-2 py-1 rounded 
                   hover:text-white hover:bg-red-500 
                   transition-colors duration-300 ease-in-out"
          >
            {" "}
            Remove File
          </button>
        </div>
      ) : (
        <label
          htmlFor={`dropzone-file-${index}`}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500">
              Upload Child's Birth Certificate
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX, PNG, JPG (any supported format)
            </p>
          </div>
          <input
            type="file"
            id={`dropzone-file-${index}`}
            style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
            {...register(`children_documents.${index}`, {
              required: "Child's file is required",
            })}
          />
        </label>
      )}

      {errors.children_documents?.[index] && (
        <p className="text-red-500 text-[1em] mt-1 ">
          {errors.children_documents[index].message}
        </p>
      )}
    </div>
  );
};

export default BirthCertificateInput;
