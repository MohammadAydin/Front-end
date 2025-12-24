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
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 shadow-sm">
          <div className="bg-yellow-100 rounded-lg p-1.5">
            <IoTimeOutline className="text-yellow-600" size={20} />
          </div>
          <span className="text-sm font-bold text-yellow-700 whitespace-nowrap">
            {t("statusPersonalInfo.pending")}
          </span>
        </div>
      ) : status === "approved" ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm">
          <div className="bg-green-100 rounded-lg p-1.5">
            <HiOutlineCheckCircle className="text-green-600" size={20} />
          </div>
          <span className="text-sm font-bold text-green-700 whitespace-nowrap">
            {t("statusPersonalInfo.approved")}
          </span>
        </div>
      ) : status === "declined" ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 shadow-sm">
          <div className="bg-red-100 rounded-lg p-1.5">
            <FaRegTimesCircle className="text-red-600" size={20} />
          </div>
          <span className="text-sm font-bold text-red-700 whitespace-nowrap">
            {t("statusPersonalInfo.declined")}
          </span>
        </div>
      ) : status === "uploaded" ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm">
          <div className="bg-blue-100 rounded-lg p-1.5">
            <GrUploadOption className="text-blue-600" size={20} />
          </div>
          <span className="text-sm font-bold text-blue-700 whitespace-nowrap">
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
