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

  const addAvatar = useMutation({
    mutationFn: (formData) =>
      customFetch
        .post("https://woundwann.de/v1/upload-photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      setServerSuccess("success upload photo profile");
      queryClient.invalidateQueries({ queryKey: ["/photo"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "error upload photo profile";
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
      className="ProfilePhoto flex  justify-center flex-col"
    >
      <div className="flex flex-col justify-center items-center">
        <ImageChange
          register={register}
          setValue={setValue}
          errors={errors}
          avatar={data?.photo}
        />
        {serverSuccess && (
          <p className=" text-green-600 font-medium mt-2">{serverSuccess}</p>
        )}
        <button
          type="submit"
          className="w-[200px] bg-[#F47621] text-white text-lg font-extrabold px-10 py-2 rounded-lg mt-4 hover:bg-[#EE6000]"
        >
          Save
        </button>
      </div>

      {serverError && (
        <p className=" text-red-600 font-medium text-center mt-2">
          {serverError}
        </p>
      )}
    </form>
  );
};

export default ProfilePhoto;
