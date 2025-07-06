import { useState } from "react";

const FileUploader = ({ name, label, register, setValue, error }) => {
  const [fileName, setFileName] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setValue(name, file, { shouldValidate: true });
      setFileName(file.name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(name, file, { shouldValidate: true });
      setFileName(file.name);
    }
  };

  return (
    <div
      className="w-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label
        htmlFor={name}
        className="cursor-pointer p-1 w-full h-[150px] bg-gray-100 rounded-xl mt-8 flex flex-col items-center justify-center text-center"
      >
        {fileName ? (
          <div>{fileName}</div>
        ) : (
          <div>
            <span className="text-xl font-bold mb-2">{label}</span>
            <p>
              Drop files here or click
              <span className="text-[#EE6000]"> browse </span> through your
              device
            </p>
          </div>
        )}
      </label>

      <input
        id={name}
        type="file"
        className="hidden"
        {...register(name)}
        onChange={handleFileChange}
      />

      {error && (
        <p className="text-red-500 text-start mt-2">{error[name]?.message}</p>
      )}
    </div>
  );
};

export default FileUploader;
