import { useState } from "react";
import previewImg from "../../assets/image/Img_Avatar.25.svg";
import { IoMdCamera } from "react-icons/io";

const ImageChange = ({ register, setValue, name = "avatar", errors }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setValue(name, file, { shouldValidate: true });
    }
  };

  return (
    <div className="w-full flex justify-start items-center gap-5 mb-8">
      <label className="click relative cursor-pointer" htmlFor="file">
        <img
          className="avatarImage rounded-full w-[100px] h-[100px]"
          src={preview ? preview : previewImg}
          alt="avatar preview"
        />
        {!preview && (
          <div className="bg-[#161c247a] w-full h-full absolute z-10 top-0 left-0 rounded-full flex items-center justify-center text-white">
            <IoMdCamera size={30} />
          </div>
        )}
      </label>

      <input
        {...register(name)}
        onChange={handleImageChange}
        className="hidden"
        id="file"
        type="file"
        accept="image/*"
      />

      <div className="imageDetails text-[#919EAB]">
        <p className="mt-2.5">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        <p>Max size of 3.1 MB</p>
      </div>
      {errors[name] && (
        <p className="text-red-500 ml-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ImageChange;
