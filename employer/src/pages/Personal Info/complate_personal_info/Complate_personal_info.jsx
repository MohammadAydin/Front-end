import { useForm } from "react-hook-form";
import InputField from "../../../components/FormElements/InputField";
import GenderSelector from "./GenderSelector";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import { createCompletePersonalInfoSchema } from "../../../utils/validationSchema.js";
import { IoPersonOutline, IoDocumentTextOutline, IoArrowBack } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

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
    });
  };

  return (
    <div className="Complate_personal_info min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-b-3xl p-6 md:p-8 relative overflow-hidden shadow-lg animate-slide-down">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <IoPersonOutline className="text-white" size={32} />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
              {t("personaldetails.title")}
            </h2>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-16">
            {t("personaldetails.description")}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <form onSubmit={handleSubmit(Submit)} className="space-y-6 animate-slide-up">
          {/* Form Fields Grid */}
          <div className="personal_info_grid grid grid-cols-1 gap-6">
            {inputs.map((input, index) => (
              <div
                key={input.name}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {input.name === "Bio" ? (
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                        <IoDocumentTextOutline className="text-[#F47621]" size={18} />
                      </div>
                      {input.label}
                    </label>
                    <textarea
                      {...register(input.name)}
                      rows={5}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-[#F47621] resize-none transition-all duration-300 placeholder:text-gray-400 text-gray-900"
                      placeholder={input.label}
                    />
                    {errors[input.name] && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <HiOutlineExclamationCircle size={16} />
                        {errors[input.name].message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                        <IoPersonOutline className="text-[#F47621]" size={18} />
                      </div>
                      {input.label}
                    </label>
                    <InputField
                      register={register}
                      errors={errors}
                      label=""
                      name={input.name}
                      type={input.type}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Server Error Display */}
          {serverError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-slide-up shadow-md">
              <HiOutlineExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <p className="text-red-800 font-semibold text-base mb-1">Error</p>
                <p className="text-red-700 text-sm">{serverError}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-8 pb-4 animate-slide-up" style={{ animationDelay: `${inputs.length * 100}ms` }}>
            <button
              type="button"
              onClick={() => navigate("/Personal info")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <IoArrowBack size={20} />
              Back
            </button>
            <button
              type="submit"
              disabled={add_personal_info_Mutatuin.isPending}
              className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-lg font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              {add_personal_info_Mutatuin.isPending && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
              {add_personal_info_Mutatuin.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complate_personal_info;
