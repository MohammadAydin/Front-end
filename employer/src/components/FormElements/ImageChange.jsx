import { useState } from "react";
import previewImg from "../../assets/image/Img_Avatar.25.svg";
import { IoMdCamera } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import useData from "../../hooks/useData";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ImageChange = ({
  register,
  setValue,
  name = "avatar",
  errors,
  watch,
}) => {
  const { t } = useTranslation();

  const { data: photodata } = useData("/photo");

  const [preview, setPreview] = useState(photodata?.data?.photo);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPreview(photodata?.data?.photo);
  }, [photodata]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setValue(name, file, { shouldValidate: true });
    }
  };
  const avatarFile = watch("avatar");

  return (
    <div className="w-full flex flex-col items-center gap-5 mb-8">
      <label
        className="relative cursor-pointer group"
        htmlFor="file"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            className="avatarImage rounded-full w-[120px] h-[120px] md:w-[140px] md:h-[140px] object-cover border-4 border-gray-200 group-hover:border-[#F47621] transition-all duration-300 shadow-lg group-hover:shadow-xl"
            src={preview ? preview : previewImg}
            alt="avatar preview"
          />

          {/* Edit Overlay - Always visible when photo exists */}
          {preview && (
            <div className={`absolute inset-0 bg-gradient-to-br from-[#F47621]/80 to-[#ff8c42]/80 rounded-full flex flex-col items-center justify-center text-white transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2">
                <FaEdit size={24} />
              </div>
              <span className="text-sm font-semibold px-3">
                {t("HouseProfile.avatar.clickToEdit") || "Click to Edit"}
              </span>
            </div>
          )}

          {/* Camera Icon - When no photo */}
          {!preview && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/90 to-[#ff8c42]/90 rounded-full flex flex-col items-center justify-center text-white">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2">
                <IoMdCamera size={30} />
              </div>
              <span className="text-sm font-semibold px-3">
                {t("HouseProfile.avatar.clickToUpload") || "Click to Upload"}
              </span>
            </div>
          )}

          {/* Edit Badge - Always visible when photo exists */}
          {preview && !isHovered && (
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-full p-2 shadow-lg border-2 border-white">
              <FaEdit size={16} className="text-white" />
            </div>
          )}
        </div>
      </label>

      <input
        {...register(name)}
        onChange={handleImageChange}
        className="hidden"
        id="file"
        type="file"
        accept="image/*"
      />

      {/* Helper Text */}
      {!avatarFile && preview && (
        <p className="text-sm text-gray-500 text-center max-w-xs">
          {t("HouseProfile.avatar.editHint") || "Click on the photo above to change your profile picture"}
        </p>
      )}

      {avatarFile && avatarFile instanceof File ? (
        <>
          <div className="imageDetails text-[#919EAB] text-center">
            <p className="mt-2.5">{t("HouseProfile.avatar.type")}</p>
            <p>{t("HouseProfile.avatar.max")}</p>
          </div>

          {errors[name] && (
            <p className="text-red-500 ml-2">{errors[name].message}</p>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageChange;
