import folderSvg from "../../assets/image/ic_folder.svg";
import { MdOutlineFileDownload } from "react-icons/md";

const DocumentsList = ({ setIsOpen }) => {
  return (
    <div className="DocumentsList flex items-center justify-between my-8 ">
      <div className="DocumentInfo flex items-center gap-5 w-[60%]">
        <img src={folderSvg} alt="" />
        <div>
          <h3 className="font-bold">The First Document of license</h3>
          <p className="documentDescription w-[80%] text-[#637381]">
            Domanets description here Domanets description here Domanets
            description here
          </p>
        </div>
      </div>
      <div className="flex items-center gap-10 font-bold mr-5">
        <span>6,2 MB</span>
        <span>pdf</span>
      </div>
      <div className="documentsBtn">
        <button
          onClick={() => setIsOpen(true)}
          className="UploadBtn w-[250px] flex gap-1 justify-center items-center font-[900] text-lg bg-[#F47621] text-white px-4 py-2 rounded-xl "
        >
          <span>
            <MdOutlineFileDownload  size={25} />
          </span>
          Upload document
        </button>
      </div>
    </div>
  );
};

export default DocumentsList;
