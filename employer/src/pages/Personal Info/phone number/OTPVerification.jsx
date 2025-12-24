import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { getApiUrl } from "../../../config/api";
import { useState } from "react";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { otpSchema } from "./phoneSchema";
import { useTranslation } from "react-i18next";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { IoShieldCheckmarkOutline, IoArrowBack } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const OTPVerification = ({ phone, setIsOtpCode, resendCode, resendTimer }) => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data) =>
      customFetch
        .post(getApiUrl("/verify-otp"), data)
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
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

  const Submit = (data) => {
    verifyOtpMutation.mutate({
      otp: data.code,
      phone: phone,
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* OTP Verification Card */}
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
          <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
            <IoShieldCheckmarkOutline className="text-[#F47621]" size={18} />
          </div>
          {t("phoneNumber.verifyOtp")}
        </label>
        
        <form onSubmit={handleSubmit(Submit)} className="space-y-4">
          <div className="flex flex-col items-start">
            <input
              {...register("code")}
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="OTPVerificationInput w-full sm:w-[400px] h-[60px] text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-[#F47621] transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="000000"
            />

            {errors.code && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <HiOutlineExclamationCircle size={16} />
                {errors.code.message}
              </p>
            )}
            {serverError && (
              <div className="mt-2 bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2 w-full sm:w-[400px]">
                <HiOutlineExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-red-700 text-sm">{serverError}</p>
              </div>
            )}
            
            <button
              type="button"
              onClick={() => {
                if (resendTimer === 0) resendCode();
              }}
              disabled={resendTimer > 0}
              className={`mt-4 font-semibold text-base transition-all duration-300 flex items-center gap-2 ${
                resendTimer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#F47621] hover:text-[#E55A1A] hover:underline"
              }`}
            >
              {resendTimer > 0 ? (
                <>
                  <span>{t("phoneNumber.resendOtp") || "Resend OTP"} in {resendTimer}s</span>
                </>
              ) : (
                <>
                  <span>{t("phoneNumber.resendOtp") || "Resend OTP"}</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              type="button"
              onClick={() => setIsOtpCode(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <IoArrowBack size={20} />
              Back
            </button>
            <button
              type="submit"
              disabled={verifyOtpMutation.isPending}
              className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-lg font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              {verifyOtpMutation.isPending && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
              {verifyOtpMutation.isPending ? "Verifying..." : t("phoneNumber.verify") || "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
