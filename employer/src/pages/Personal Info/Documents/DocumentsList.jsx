import folderSvg from "../../../assets/images/ic_folder.svg";
import { FiUpload } from "react-icons/fi";

import { FaRegClock } from "react-icons/fa";
import { useState } from "react";
import UploadDocs from "./UploadDocs";
import { useTranslation } from "react-i18next";
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
    <div className="DocumentsList flex items-center justify-between py-5 border-b border-[#919eab63] border-dashed">
      <div className="DocumentInfo flex items-center gap-5 w-[60%]">
        {docs?.is_required === 1 ? (
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        ) : (
          <div className="w-2 h-2"></div>
        )}

        <img src={folderSvg} alt="" />
        <div>
          <h3 className="font-bold">{docs.title}</h3>
          <p className="documentDescription text-[#637381]">
            {docs.description}
          </p>
        </div>
      </div>

      {isUploading && (
        <p className="FileName pr-8 text-[#194894]">
          {isUploading.slice(0, 15)}
          {isUploading.length > 15 ? "..." : ""}
        </p>
      )}
      <div className="documentsBtn flex flex-col items-center justify-center">
        <div className={`flex gap-2.5 items-center`}>
          <button
            onClick={() => setIsOpen(true)}
            className={`UploadBtn w-[250px] flex gap-1 justify-center items-center font-[900] text-lg ${
              docs?.status == "uploaded" ? "bg-green-400" : "bg-[#F47621]"
            } text-white px-4 py-2 rounded-xl`}
            aria-label={t("documents.uploadDocument")}
          >
            <span>
              <FiUpload size={25} />
            </span>
            {docs?.status == "uploaded" ? "reupload" : "uploadDocument"}
          </button>
        </div>
        {docs.duo_to && (
          <p className="text-[#637381] text-sm flex items-center gap-1 mt-2">
            <FaRegClock size={20} />
            <span> {docs.duo_to}</span>
          </p>
        )}
      </div>

      <UploadDocs
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsUploading={setIsUploading}
        document_id={docs.id}
        setDocuments={setDocuments}
      />
    </div>
  );
};

export default DocumentsList;
