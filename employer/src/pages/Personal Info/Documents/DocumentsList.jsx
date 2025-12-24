import folderSvg from "../../../assets/images/ic_folder.svg";
import { FiUpload } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { useState } from "react";
import UploadDocs from "./UploadDocs";
import { useTranslation } from "react-i18next";
import { IoDocumentTextOutline, IoCheckmarkCircle } from "react-icons/io5";
const DocumentsList = ({ docs, setDocuments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState("");
  const { t } = useTranslation();

  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <div className="DocumentsList bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Document Info */}
          <div className="DocumentInfo flex items-start gap-4 flex-1">
            {docs?.is_required === 1 ? (
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
            ) : (
              <div className="w-3 h-3 flex-shrink-0"></div>
            )}

            <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-xl p-3 flex-shrink-0">
              <IoDocumentTextOutline className="text-[#F47621]" size={24} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-800">{docs.title}</h3>
                {docs?.status == "uploaded" && (
                  <IoCheckmarkCircle className="text-green-500 flex-shrink-0" size={20} />
                )}
              </div>
              <p className="documentDescription text-gray-600 text-sm">
                {docs.description}
              </p>
              {docs.duo_to && (
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-2">
                  <FaRegClock size={14} />
                  <span>{docs.duo_to}</span>
                </p>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="documentsBtn flex flex-col items-end sm:items-center gap-2 flex-shrink-0">
            {isUploading && (
              <p className="FileName text-[#194894] text-sm font-medium bg-blue-50 px-3 py-1 rounded-lg">
                {isUploading.length > 20 ? `${isUploading.slice(0, 20)}...` : isUploading}
              </p>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className={`UploadBtn flex gap-2 justify-center items-center font-bold text-base px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${
                docs?.status == "uploaded"
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  : "bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white"
              }`}
              aria-label={t("documents.uploadDocument")}
            >
              <FiUpload size={20} />
              <span>{docs?.status == "uploaded" ? t("documents.reupload") || "Reupload" : t("documents.uploadDocument") || "Upload"}</span>
            </button>
          </div>
        </div>
      </div>

      <UploadDocs
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsUploading={setIsUploading}
        document_id={docs.id}
        setDocuments={setDocuments}
      />
    </>
  );
};

export default DocumentsList;
