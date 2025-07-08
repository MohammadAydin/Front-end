import { useEffect, useState } from "react";
import DocumentsList from "./DocumentsList";
import useData from "../../../hooks/useData";
import { useNavigate } from "react-router-dom";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import "../../Responsive css/Personal_info.css";

const Documents = () => {
  const navigate = useNavigate();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [documents, setDocuments] = useState({}); // { document_id: File }
  const [isReady, setIsReady] = useState(false);
  const { data: requiredDocs } = useData("/user/documents");

  // make sure all documents is uploading
  useEffect(() => {
    if (!requiredDocs) return;

    const requiredOnly = requiredDocs.filter((doc) => doc.is_required === 1);

    const allRequiredUploaded = requiredOnly.every(
      (doc) => documents[doc.id] instanceof File
    );

    setIsReady(allRequiredUploaded);
  }, [documents, requiredDocs]);

  const uploadDocumentsMutation = useMutation({
    mutationFn: (formData) =>
      customFetch
        .post("https://woundwann.de/v1/upload/documents", formData, {
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
        error?.response?.data?.message || "Something went wrong!";

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });

  const submit = () => {
    const formData = new FormData();

    for (const [docId, file] of Object.entries(documents)) {
      formData.append(`documents[${docId}]`, file);
    }

    uploadDocumentsMutation.mutate(formData);
  };

  return (
    <div className="Documents p-[28px] py-[58px]">
      <div className="my-5">
        {requiredDocs?.map((docs) => (
          <DocumentsList
            key={docs.id}
            docs={docs}
            setDocuments={setDocuments}
          />
        ))}
      </div>
      {!isReady && (
        <p className="w-full bg-[#f4752117] py-5 text-center rounded-lg text-[#F47621] mt-2">
          Please upload all required documents before Press Add.
        </p>
      )}
      <div className="mt-10 flex flex-col items-end">
        <div>
          <button
            onClick={() => navigate("/Personal info")}
            className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg mt-4 hover:bg-[#cfcfd3] mr-3"
          >
            Back
          </button>
          <button
            disabled={!isReady}
            onClick={submit}
            className={`px-6 py-3 rounded-xl font-bold ${
              isReady ? "bg-[#F47621] text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            Add
          </button>
        </div>
        {serverError && (
          <p className="text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
        )}
      </div>
    </div>
  );
};

export default Documents;
