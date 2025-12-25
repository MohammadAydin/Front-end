import { useEffect, useState } from "react";
import DocumentsList from "./DocumentsList";
import useData from "../../../hooks/useData";
import { useNavigate } from "react-router-dom";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { getApiUrl } from "../../../config/api";
import "../../Responsive css/Personal_info.css";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/MoreElements/Spinner";
import { FaHourglassHalf } from "react-icons/fa6";
import statusAccount from "../../../utils/statusAccountReturn";
import useStatusAccount from "../../../store/storeStatusAccount";
import { IoDocumentTextOutline, IoArrowBack } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const Documents = () => {
  const status = useStatusAccount((state) => state.status);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [documents, setDocuments] = useState({}); // { document_id: File }
  const [isReady, setIsReady] = useState(false);
  const { data: requiredDocs } = useData("/user/documents");

  // make sure all documents is uploading
  useEffect(() => {
    if (!requiredDocs) return;

    const requiredOnly = requiredDocs?.data?.filter(
      (doc) => doc.is_required === 1
    );

    const allRequiredUploaded = requiredOnly.every(
      (doc) => documents[doc.id] instanceof File
    );

    setIsReady(allRequiredUploaded);
  }, [documents, requiredDocs]);

  const uploadDocumentsMutation = useMutation({
    mutationFn: (formData) =>
      customFetch
        .post(getApiUrl("/upload/documents"), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t("documents.error");

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });

  const isUploading = uploadDocumentsMutation.isPending;

  const submit = () => {
    const formData = new FormData();

    for (const [docId, file] of Object.entries(documents)) {
      formData.append(`documents[${docId}]`, file);
    }

    uploadDocumentsMutation.mutate(formData);
  };
  //  if (status !== "approved") {
  //   return statusAccount(status);
  // }

  return (
    <div className="Documents min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-b-3xl p-6 md:p-8 relative overflow-hidden shadow-lg animate-slide-down">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <IoDocumentTextOutline className="text-white" size={32} />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
              {t("documents.title")}
            </h2>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-16">
            {t("documents.description")}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Empty State */}
        {requiredDocs?.data?.length == 0 && (
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-100 text-center animate-slide-up">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <IoDocumentTextOutline className="text-gray-400" size={40} />
            </div>
            <p className="text-gray-600 text-lg font-medium">
              There are no files to upload at the moment
            </p>
          </div>
        )}

        {/* Documents List */}
        {requiredDocs && requiredDocs?.data?.length > 0 && (
          <div className="space-y-4 animate-slide-up">
            {requiredDocs?.data?.map((docs, index) => (
              <div
                key={docs.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slide-up"
              >
                <DocumentsList
                  docs={docs}
                  setDocuments={setDocuments}
                />
              </div>
            ))}
          </div>
        )}

        {/* Warning Message */}
        {!isReady && requiredDocs?.data?.length > 0 && (
          <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-slide-up shadow-md">
            <HiOutlineExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <p className="text-red-700 text-sm font-medium">
              {t("documents.uploadAllRequired")}
            </p>
          </div>
        )}

        {/* Server Error Display */}
        {serverError && (
          <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-slide-up shadow-md">
            <HiOutlineExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <p className="text-red-800 font-semibold text-base mb-1">Error</p>
              <p className="text-red-700 text-sm">{serverError}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-4 animate-slide-up" style={{ animationDelay: `${(requiredDocs?.data?.length || 0) * 50}ms` }}>
          <button
            onClick={() => navigate("/Personal info")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <IoArrowBack size={20} />
            {t("documents.back")}
          </button>
          <button
            disabled={!isReady || isUploading}
            onClick={submit}
            className={`px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
              !isReady || isUploading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white"
            }`}
          >
            {isUploading && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            )}
            {isUploading ? "Uploading..." : t("documents.submit")}
          </button>
        </div>
      </div>

      {/* Uploading Modal */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm animate-slide-up">
          <div className="DocumentsUploading bg-white w-full max-w-md rounded-2xl p-8 flex flex-col items-center gap-6 shadow-2xl animate-slide-up">
            <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-full p-4">
              <FaHourglassHalf className="text-[#F47621]" size={50} />
            </div>
            <div className="w-full max-w-xs">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#F47621] to-[#ff8c42] animate-pulse rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-700 font-semibold text-lg">Uploading documents...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
