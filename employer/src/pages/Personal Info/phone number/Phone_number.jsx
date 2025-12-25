import GermanyFlag from "../../../assets/images/icon-sidebar/germany.svg";
import InputField from "../../../components/FormElements/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { getApiUrl } from "../../../config/api";
import { phoneSchema } from "./phoneSchema";
import OTPVerification from "./OTPVerification";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoPhonePortraitOutline, IoArrowBack } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const Phone_number = () => {
  const { t } = useTranslation();
  const [isOtpCode, setIsOtpCode] = useState(false);
  const [phone, setPhone] = useState("");
  const [serverError, setServerError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const sendCodeMutation = useMutation({
    mutationFn: (phoneNumber) =>
      customFetch
        .post(getApiUrl("/send-otp"), phoneNumber)
        .then((res) => {
          res.data;
        }),

    onSuccess: () => {
      setIsOtpCode(true);
      setResendTimer(60); // timer 1 min to send the code again
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t("phoneNumber.error");

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });

  useEffect(() => {
    let interval;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(phoneSchema) });

  const Submit = (data) => {
    const fullPhone = "+49" + data.phone_number;
    setPhone(fullPhone);

    sendCodeMutation.mutate({ phone: fullPhone });
  };

  return (
    <div className="Social_Insurance min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-b-3xl p-6 md:p-8 relative overflow-hidden shadow-lg animate-slide-down">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <IoPhonePortraitOutline className="text-white" size={32} />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
              {t("phoneNumber.title")}
            </h2>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-16">
            {t("phoneNumber.description")}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {!isOtpCode ? (
          <form onSubmit={handleSubmit(Submit)} className="space-y-6 animate-slide-up">
            {/* Phone Number Input Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
                <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                  <IoPhonePortraitOutline className="text-[#F47621]" size={18} />
                </div>
                {t("phoneNumberAdd.addNumber") || "Add Phone Number"}
              </label>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Country Code Selector */}
                <div className="Phone_number_falg bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center justify-center gap-2 min-w-[120px] hover:border-[#F47621]/50 transition-all duration-300">
                  <input
                    className="w-full bg-transparent text-gray-700 font-semibold text-center focus:outline-none"
                    type="text"
                    readOnly={true}
                    value={"+49"}
                  />
                  <img className="w-6 h-4 object-cover rounded" src={GermanyFlag} alt="Germany flag" />
                </div>

                {/* Phone Number Input */}
                <div className="Phone_number_input flex-1">
                  <InputField
                    register={register}
                    errors={errors}
                    name={"phone_number"}
                    label={t("phoneNumber.fields.phoneNumber")}
                    type={"tel"}
                  />
                </div>
              </div>

              {/* Server Error Display */}
              {serverError && (
                <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-md">
                  <HiOutlineExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-700 text-sm">{serverError}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <button
                type="button"
                onClick={() => navigate("/Personal info")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
              >
                <IoArrowBack size={20} />
                {t("phoneNumber.back")}
              </button>
              <button
                type="submit"
                disabled={sendCodeMutation.isPending}
                className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-lg font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
              >
                {sendCodeMutation.isPending && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                )}
                {sendCodeMutation.isPending ? "Sending..." : t("phoneNumber.sendOtp")}
              </button>
            </div>
          </form>
        ) : (
          <OTPVerification
            setIsOtpCode={setIsOtpCode}
            phone={phone}
            resendCode={() => sendCodeMutation.mutate({ phone })}
            resendTimer={resendTimer}
          />
        )}
      </div>
    </div>
  );
};

export default Phone_number;
