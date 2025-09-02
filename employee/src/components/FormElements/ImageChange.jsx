import { useState } from "react";
import previewImg from "../../assets/images/Img_Avatar.25.svg";
import { IoMdCamera } from "react-icons/io";
import { useTranslation } from "react-i18next";

const ImageChange = ({
  register,
  setValue,
  name = "avatar",
  errors,
  avatar = previewImg,
  setHasImage,
}) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setValue(name, file, { shouldValidate: true });
      setHasImage(true);
    }
  };

  return (
    <div className="ImageChange w-full flex justify-start items-center gap-5">
      <label className="click relative cursor-pointer" htmlFor="file">
        <img
          className="avatarImage rounded-full w-[100px] h-[100px] object-cover"
          src={preview ? preview : avatar}
          alt={t("formElements.imageUploader.altText")}
        />
        {!preview && (
          <div className="bg-[#161c247a] w-full h-full absolute z-2 top-0 left-0 rounded-full flex items-center justify-center text-white">
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
        <p className="mt-2.5">
          {t("formElements.imageUploader.allowedFormats")}
        </p>
        <p>{t("formElements.imageUploader.maxSize")}</p>
      </div>
      {errors[name] && (
        <p className="text-red-500 ml-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ImageChange;
