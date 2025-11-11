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
    <>
      <p className="mb-5 text-lg font-bold">{t("phoneNumber.verifyOtp")}</p>
      <form onSubmit={handleSubmit(Submit)}>
        <div className="flex flex-col items-start">
          <input
            {...register("code")}
            type="text"
            inputMode="numeric"
            className="OTPVerificationInput w-[400px] h-[50px] text-center text-xl border border-[#919eab80] rounded-lg focus:outline-none"
          />

          {errors.code && (
            <p className="text-red-500 mt-2">{errors.code.message}</p>
          )}
          {serverError && <p className="text-red-500 mt-2">{serverError}</p>}
          <button
            type="button"
            onClick={() => {
              if (resendTimer === 0) resendCode();
            }}
            disabled={resendTimer > 0}
            className={`mt-5 font-bold text-lg cursor-pointer ${
              resendTimer > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-900 hover:text-[#EE6000]"
            }`}
          >
            {resendTimer > 0 ? `resendOtp in ${resendTimer}s` : "esendOtp"}
          </button>
        </div>
        <SubmitButtons
          prevLabel="back"
          onCancel={() => setIsOtpCode(false)}
        />
      </form>
    </>
  );
};

export default OTPVerification;
