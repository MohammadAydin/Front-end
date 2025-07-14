import folderSvg from "../../../assets/images/ic_folder.svg";
import { MdOutlineFileDownload } from "react-icons/md";
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
    <div className="DocumentsList flex items-center justify-between py-3 border-b border-[#919eab63] border-dashed">
      <div className="DocumentInfo flex items-center gap-5 w-[60%]">
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
        <button
          onClick={() => setIsOpen(true)}
          className="UploadBtn w-[250px] flex gap-1 justify-center items-center font-[900] text-lg bg-[#F47621] text-white px-4 py-2 rounded-xl "
          aria-label={t("documents.uploadDocument")}
        >
          <span>
            <MdOutlineFileDownload size={25} />
          </span>
          {t("documents.uploadDocument")}
        </button>
        <p className="text-[#637381] text-sm flex items-center gap-1 mt-2">
          <FaRegClock size={20} />
          <span> {docs.duo_to}</span>
        </p>
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
