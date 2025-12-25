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
        <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 shadow-sm w-auto mx-auto sm:mx-0">
          <div className="bg-yellow-100 rounded-full p-1 sm:p-1.5 flex-shrink-0">
            <IoTimeOutline className="text-yellow-600" size={18} />
          </div>
          <span className="text-xs sm:text-sm font-bold text-yellow-700 whitespace-nowrap">
            {t("statusPersonalInfo.pending")}
          </span>
        </div>
      ) : status === "approved" ? (
        <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm w-auto mx-auto sm:mx-0">
          <div className="bg-green-100 rounded-full p-1 sm:p-1.5 flex-shrink-0">
            <HiOutlineCheckCircle className="text-green-600" size={18} />
          </div>
          <span className="text-xs sm:text-sm font-bold text-green-700 whitespace-nowrap">
            {t("statusPersonalInfo.approved")}
          </span>
        </div>
      ) : status === "declined" ? (
        <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 shadow-sm w-auto mx-auto sm:mx-0">
          <div className="bg-red-100 rounded-full p-1 sm:p-1.5 flex-shrink-0">
            <FaRegTimesCircle className="text-red-600" size={18} />
          </div>
          <span className="text-xs sm:text-sm font-bold text-red-700 whitespace-nowrap">
            {t("statusPersonalInfo.declined")}
          </span>
        </div>
      ) : status === "uploaded" ? (
        <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm w-auto mx-auto sm:mx-0">
          <div className="bg-blue-100 rounded-full p-1 sm:p-1.5 flex-shrink-0">
            <GrUploadOption className="text-blue-600" size={18} />
          </div>
          <span className="text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">
            {t("statusPersonalInfo.uploaded")}
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Status;
