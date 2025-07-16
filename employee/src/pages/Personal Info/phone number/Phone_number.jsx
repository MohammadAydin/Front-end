import GermanyFlag from "../../../assets/images/icon-sidebar/germany.svg";
import InputField from "../../../components/FormElements/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { phoneSchema } from "./phoneSchema";
import OTPVerification from "./OTPVerification";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
        .post("https://woundwann.de/v1/send-otp", phoneNumber)
        .then((res) => {
          res.data;
        }),

    onSuccess: () => {
      console.log("seccess");
      setIsOtpCode(true);
      setResendTimer(60); // timer 1 min to send the code again
    },

    onError: (error) => {
      console.log(error);

      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t('phoneNumber.error');

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
    <div className="Social_Insurance p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">{t('phoneNumber.title')}</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {t('phoneNumber.description')}
      </p>

      {!isOtpCode ? (
        <>
          <p className="mb-5 text-lg font-bold">{t("phoneNumberAdd.addNumber")}</p>
          <form onSubmit={handleSubmit(Submit)} className="">
            <div className="flex gap-5 items-start">
              <div className="Phone_number_falg border border-[#919eab80] px-5 flex items-center justify-center  rounded-lg w-25">
                <input
                  className="w-full h-[50px]"
                  type="text"
                  readOnly={true}
                  value={"+49"}
                />
                <img className="w-5" src={GermanyFlag} alt="" />
              </div>
              <div className="Phone_number_input w-[400px]">
                <InputField
                  register={register}
                  errors={errors}
                  name={"phone_number"}
                  label={t('phoneNumber.fields.phoneNumber')}
                  type={"tel"}
                />
                {serverError && (
                  <p className="text-red-600 mt-2 font-medium text-start mb-4">
                    {serverError}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 font-bold text-lg hover:text-[#EE6000] cursor-pointer text-blue-900"
            >
              {t('phoneNumber.sendOtp')}
            </button>
          </form>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/Personal info")}
              className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg mt-4 hover:bg-[#cfcfd3]"
            >
              {t('phoneNumber.back')}
            </button>
          </div>
        </>
      ) : (
        <OTPVerification
          setIsOtpCode={setIsOtpCode}
          phone={phone}
          resendCode={() => sendCodeMutation.mutate({ phone })}
          resendTimer={resendTimer}
        />
      )}
    </div>
  );
};

export default Phone_number;
