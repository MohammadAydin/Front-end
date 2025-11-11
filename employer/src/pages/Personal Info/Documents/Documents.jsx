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
    <div className="Documents p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">{t("documents.title")}</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {t("documents.description")}
      </p>
      {requiredDocs?.data?.length == 0 && (
        <p>There are no files to upload at the moment </p>
      )}
      {requiredDocs && (
        <div className="my-5">
          {requiredDocs?.data?.map((docs) => (
            <DocumentsList
              key={docs.id}
              docs={docs}
              setDocuments={setDocuments}
            />
          ))}
        </div>
      )}
      {!isReady && (
        <p className="w-full bg-[#f4212127] py-5 text-center rounded-lg text-[#f42121] mt-2">
          {t("documents.uploadAllRequired")}
        </p>
      )}
      <div className="mt-10 flex flex-col items-end">
        <div>
          <button
            onClick={() => navigate("/Personal info")}
            className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg mt-4 hover:bg-[#cfcfd3] mr-3"
          >
            {t("documents.back")}
          </button>
          <button
            disabled={!isReady || isUploading}
            onClick={submit}
            className={`px-6 py-3 rounded-xl font-bold 
              ${
                !isReady
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[#F47621] text-white"
              }`}
          >
            {t("documents.submit")}
          </button>
        </div>
        {serverError && (
          <p className="w-full text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
        )}
      </div>
      {isUploading && (
        <div className=" w-full h-[100vh] fixed z-20 top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <div className="DocumentsUploading bg-white w-[500px] h-[200px] rounded-2xl p-5 py-10 flex flex-col items-center gap-5">
            <FaHourglassHalf color="#F47621" size={50} />

            <div className="w-[300px] h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#F47621] animate-pulse"></div>
            </div>
            <p>uploading</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
