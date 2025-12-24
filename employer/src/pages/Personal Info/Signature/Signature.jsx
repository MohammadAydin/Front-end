import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signatureSchema from "./signatureSchema";
import SignaturePad from "./SignaturePad";
import FileUploader from "../../../components/FormElements/FileUploader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { getApiUrl } from "../../../config/api";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import useData from "../../../hooks/useData";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { FaSignature } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const Signature = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [searchParams] = useSearchParams();
  const isUploaded = searchParams.get("uploaded") === "true";
  const { data: UplodedSignature } = useData("/signature");
  const [showSignature, setShowSignature] = useState(false);
  const navigate = useNavigate();

  const addSignatureMutatuin = useMutation({
    mutationFn: (Signature) =>
      customFetch
        .post(getApiUrl("/upload-signature"), Signature, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info?uploaded=true");
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t("signature.error");

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signatureSchema()),
    defaultValues: {
      signature: null,
    },
  });

  useEffect(() => {
    register("signature");
  }, [register]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("signature", data.signature);

    addSignatureMutatuin.mutate(formData);
  };
  return (
    <div className="Signature min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-b-3xl p-6 md:p-8 relative overflow-hidden shadow-lg animate-slide-down">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <FaSignature className="text-white" size={32} />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
              {isUploaded && UplodedSignature ? t("signature.title") : t("signature.title")}
            </h2>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-16">
            {isUploaded && UplodedSignature
              ? t("signature.alreadyUploaded") || "You have already uploaded a signature"
              : t("signature.description")}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Show Signature Button (if uploaded) */}
        {isUploaded && UplodedSignature && (
          <div className="mb-6 animate-slide-up">
            <button
              onClick={() => setShowSignature(true)}
              className="w-full bg-gradient-to-r from-[#F47621]/10 to-[#ff8c42]/10 hover:from-[#F47621]/20 hover:to-[#ff8c42]/20 border-2 border-[#F47621]/30 hover:border-[#F47621] text-[#F47621] font-bold rounded-xl py-4 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaSignature size={20} />
              {t("signature.showSignature") || "Show Signature"}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up">
          {/* Signature Pad Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300">
            <SignaturePad setValue={setValue} error={errors.signature} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm font-semibold text-gray-500 uppercase">
              {t("signature.orUpload") || "OR"}
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* File Uploader Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <FileUploader
              register={register}
              setValue={setValue}
              error={errors}
              name={"signature"}
              label={t("signature.uploadSignature")}
            />
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
            <button
              type="button"
              onClick={() => navigate("/Personal info")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <IoArrowBack size={20} />
              {t("signature.back")}
            </button>
            <button
              type="submit"
              disabled={addSignatureMutatuin.isPending}
              className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-lg font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              {addSignatureMutatuin.isPending && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
              {addSignatureMutatuin.isPending ? "Saving..." : (isUploaded ? t("signature.Submit") : t("signature.Add") || "Add")}
            </button>
          </div>
        </form>
      </div>

      {/* Signature Preview Modal */}
      {showSignature && UplodedSignature && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm animate-slide-up p-4">
          <div className="showSignature w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative animate-slide-up overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <FaSignature className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t("signature.yourSignature")}
                  </h3>
                </div>
                <button
                  onClick={() => setShowSignature(false)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300"
                  aria-label="Close"
                >
                  <IoClose className="text-white" size={24} />
                </button>
              </div>
            </div>

            {/* Signature Image */}
            <div className="p-6 md:p-8">
              <div className="h-[300px] md:h-[400px] border-2 border-gray-200 rounded-xl flex justify-center items-center bg-gray-50">
                <img
                  src={`${UplodedSignature.data?.url}?t=${new Date().getTime()}`}
                  alt="Uploaded Signature"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100">
              <button
                className="w-full bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-lg font-bold px-10 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => setShowSignature(false)}
              >
                {t("signature.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signature;
