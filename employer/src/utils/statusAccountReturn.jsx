import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import newStatusImg from "../assets/image/statusimage/newstatus.png";
import pendingStatusImg from "../assets/image/statusimage/pendingstatus.png";
import suspendedStatusImg from "../assets/image/statusimage/suspendedstatus.png";
import OnHoldstatusImg from "../assets/image/statusimage/OnHold.png";
import declinedstatusImg from "../assets/image/statusimage/declinedstatus.png";

const StatusAccount = ({ status }) => {
  const { t } = useTranslation();

  switch (status) {
    case "new":
      return (
        <div className="flex items-center justify-center flex-col h-full">
          <div className="relative flex items-center justify-center text-xl font-bold flex-col text-center p-9">
            <img className="w-90" src={newStatusImg} alt="" />
            <p className="absolute bottom-5 max-[320px]:bottom-[-20px]">
              {t("StatusAccount.new")}
            </p>
          </div>
          <div className="mt-2 max-[320px]:mt-10">
            <Link
              to="/Personal Info"
              className="bg-blue-400 text-white p-2.5 rounded-[15px]"
            >
              {t("StatusAccount.button.Complete")}
            </Link>
          </div>
        </div>
      );

    case "pending":
      return (
        <div className="relative h-full flex items-center justify-center text-xl font-bold flex-col text-center p-9">
          <img className="w-90" src={pendingStatusImg} alt="" />
          <p className="z-10 absolute mt-84">{t("StatusAccount.pending")}</p>
        </div>
      );

    case "suspended":
      return (
        <div className="relative h-full flex items-center justify-center text-xl font-bold flex-col text-center p-9">
          <img className="w-90" src={suspendedStatusImg} alt="" />
          <p className="z-10 absolute mt-92">{t("StatusAccount.suspended")}</p>
        </div>
      );

    case "onHold":
      return (
        <div className="relative h-full flex items-center justify-center text-xl font-bold flex-col text-center p-9">
          <img className="w-90" src={OnHoldstatusImg} alt="" />
          <p className="z-10 absolute mt-70">{t("StatusAccount.onHold")}</p>
        </div>
      );

    case "declined":
      return (
        <div className="flex items-center justify-center flex-col h-full">
          <div className="relative flex items-center justify-center text-xl font-bold flex-col text-center p-5">
            <img className="w-90" src={declinedstatusImg} alt="" />
            <p className="z-10 absolute mt-70">{t("StatusAccount.declined")}</p>
          </div>
          <div className="max-[320px]:mt-10">
            <Link
              to="/Personal Info"
              className="bg-blue-400 text-white p-2.5 rounded-[15px]"
            >
              {t("StatusAccount.button.Re-upload")}
            </Link>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative h-full flex items-center justify-center" />
      );
  }
};

export default StatusAccount;
