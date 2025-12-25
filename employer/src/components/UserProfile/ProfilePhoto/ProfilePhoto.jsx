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
import { getApiUrl } from "../../../config/api";

const ProfilePhoto = () => {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const { data } = useData("/photo");
  const queryClient = useQueryClient();

  const addAvatar = useMutation({
    mutationFn: (formData) =>
      customFetch
        .post(getApiUrl("/upload-photo"), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      setServerSuccess("success upload photo profile");
      queryClient.invalidateQueries({ queryKey: ["/photo"] });
      resetField("avatar");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "error upload photo profile";
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
    watch,
    resetField,
  } = useForm({ resolver: zodResolver(ShemaPhoto) });

  const submit = (data) => {
    const formData = new FormData();
    formData.append("photo", data.avatar);

    addAvatar.mutate(formData);
  };
  const avatarFile = watch("avatar");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="ProfilePhoto flex justify-center flex-col"
    >
      <div className="flex flex-col justify-center items-center">
        <ImageChange
          register={register}
          setValue={setValue}
          errors={errors}
          avatar={data?.photo}
          watch={watch}
        />
        {serverSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mt-4 animate-slide-up">
            <p className="text-green-600 font-semibold text-center">
              {serverSuccess}
            </p>
          </div>
        )}
        {avatarFile && avatarFile instanceof File && (
          <button
            type="submit"
            disabled={addAvatar.isPending}
            className="w-full max-w-[250px] bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-base md:text-lg font-bold px-8 py-3 rounded-full mt-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {addAvatar.isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t("common.saving") || "Saving..."}</span>
              </>
            ) : (
              <>
                <span>{t("HouseProfile.avatar.save")}</span>
              </>
            )}
          </button>
        )}
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-4 animate-slide-up max-w-md">
          <p className="text-red-600 font-semibold text-center">
            {serverError}
          </p>
        </div>
      )}
    </form>
  );
};

export default ProfilePhoto;
