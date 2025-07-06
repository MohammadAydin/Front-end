import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentsList from "../components/Documents/DocumentsList";
import UploadDocs from "../components/Documents/UploadDocs";
import "./Css Responsive/DocumentsResponsive.css";
const Documents = () => {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return (
    <div className="Documents p-[28px] py-[58px]">
      <div className="flex items-center gap-2">
        <IoDocumentTextOutline size={30} />
        <h2 className="font-[900] text-xl">Documents</h2>
      </div>
      <div className="my-5">
        <DocumentsList setIsOpen={setIsOpen} />
        <DocumentsList setIsOpen={setIsOpen} />
        <DocumentsList setIsOpen={setIsOpen} />
        <DocumentsList setIsOpen={setIsOpen} />
      </div>
      <UploadDocs isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Documents;
