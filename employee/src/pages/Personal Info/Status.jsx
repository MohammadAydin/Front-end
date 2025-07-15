import { IoTimeOutline } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { GrUploadOption } from "react-icons/gr";


const Status = ({ status }) => {
  const { t } = useTranslation();

  return (
    <>
      {status === "pending" ? (
        <div className="flex items-center pr-8 gap-3 text-lg font-bold text-yellow-500">
          <IoTimeOutline size={30} />
          <span>{t('personalInfoSections.pending')}</span>
        </div>
      ) : status === "approved" ? (
        <div className="flex items-center pr-4 gap-3 text-lg font-bold text-green-500">
          <HiOutlineCheckCircle size={30} />
          <span>{t('personalInfoSections.completed')}</span>
        </div>
      ) : status === "declined" ? (
        <div className="flex items-center pr-8 gap-3 text-lg font-bold text-red-500">
          <FaRegTimesCircle size={30} />
          <span>{t('personalInfoSections.rejected')}</span>
        </div>
      ) : status === "uploaded" ? (
        <div className="flex items-center pr-8 gap-3 text-lg font-bold text-blue-500">
          <GrUploadOption size={30} />
          <span>Uploaded</span>
        </div>

      ) : (
        ""
      )}
    </>
  );
};

export default Status;
