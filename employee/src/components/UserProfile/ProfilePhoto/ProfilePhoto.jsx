import { useForm } from "react-hook-form";
import ImageChange from "../../FormElements/ImageChange";
import { zodResolver } from "@hookform/resolvers/zod";
import ShemaPhoto from "./SchemaPhoto";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useEffect, useState } from "react";
import useData from "../../../hooks/useData";
import { useTranslation } from "react-i18next";

const ProfilePhoto = () => {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const { data } = useData("/photo");
  const queryClient = useQueryClient();
  const [hasImage, setHasImage] = useState(false);
  const [isUpload, setisUpload] = useState(false);

  const addAvatar = useMutation({
    mutationFn: (formData) =>
      customFetch
        .post("https://woundwann.de/v1/upload-photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      setServerSuccess(t("userProfileComponents.profilePhoto.successMessage"));
      setisUpload(true);
      queryClient.invalidateQueries({ queryKey: ["/photo"] });
      window.location.reload();
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        t("userProfileComponents.profilePhoto.errorMessage");
      setServerError(message);
    },
  });

  useEffect(() => {
    if (serverSuccess) {
      const timer = setTimeout(() => {
        setServerSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [serverSuccess, setServerSuccess]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ShemaPhoto) });

  const submit = (data) => {
    const formData = new FormData();
    formData.append("photo", data.avatar);

    addAvatar.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="ProfilePhoto flex items-start justify-between"
    >
      <div>
        <ImageChange
          register={register}
          setValue={setValue}
          errors={errors}
          avatar={data?.photo}
          setHasImage={setHasImage}
        />
        {serverSuccess && (
          <p className=" text-green-600 font-medium text-start mt-2">
            {serverSuccess}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className={`w-[200px] ${
            !hasImage ? "bg-gray-400" : "bg-[#F47621] "
          }  text-white text-lg font-extrabold px-10 py-2 rounded-lg mt-4 `}
          disabled={!hasImage}
        >
          {t("userProfileComponents.profilePhoto.saveButton")}
        </button>
        {serverError && (
          <p className=" text-red-600 font-medium text-center mt-2">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProfilePhoto;
