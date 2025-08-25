import { useForm } from "react-hook-form";
import InputField from "../../../components/FormElements/InputField";
import GenderSelector from "./GenderSelector";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import { createCompletePersonalInfoSchema } from "../../../utils/validationSchema.js";

const Complate_personal_info = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const inputs = [
    {
      name: "Username",
      label: t("personaldetails.fields.username"),
      type: "text",
    },
    { name: "Bio", label: t("personaldetails.fields.bio"), type: "text" },
  ];

  const add_personal_info_Mutatuin = useMutation({
    mutationFn: (info) =>
      customFetch.put("/personal-info", info).then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t("completePersonalInfo.error");

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCompletePersonalInfoSchema(t)),
    defaultValues: {
      gender: "",
    },
  });

  // // change the date from DD.MM.YYYY to YYYY-MM-DD
  // const formatDateToISO = (dateString) => {
  //   const [day, month, year] = dateString.split(".");
  //   return `${year}-${month}-${day}`;
  // };

  const Submit = (data) => {
    // const formattedDate = formatDateToISO(data.Birthday);

    add_personal_info_Mutatuin.mutate({
      username: data.Username,
      bio: data.Bio,
      birthday: "22.02.1900",
      gender: data.gender,
    });
  };

  return (
    <div className="Complate_personal_info p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">{t("personaldetails.title")} </h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {t("personaldetails.description")}{" "}
      </p>
      <form onSubmit={handleSubmit(Submit)}>
        <div className="personal_info_grid grid grid-cols-2 gap-5">
          <div>
            <GenderSelector name="gender" control={control} />
            {errors.gender && (
              <p className="text-red-500 mt-2">{errors.gender.message}</p>
            )}
          </div>
          {inputs.map((input) => (
            <InputField
              key={input.name}
              register={register}
              errors={errors}
              label={input.label}
              name={input.name}
              type={input.type}
            />
          ))}
        </div>
        {serverError && (
          <p className="text-red-600 font-medium text-start my-4">
            {serverError}
          </p>
        )}
        <SubmitButtons
          prevLabel="back"
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Complate_personal_info;
