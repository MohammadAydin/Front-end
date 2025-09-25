import React from "react";
import useRequestsStore from "../../store/HelpRequestsStore";
import RequestsForm from "../../components/HelpRequests/RequestsForm/RequestsForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusAccount from "../../utils/statusAccountReturn";

const CoustomHelpRequest = () => {
  const { RequestOpen } = useRequestsStore();
  const { t } = useTranslation();
  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }
  return (
    <>
      <div className="flex flex-col gap-6 p-6 h-screen justify-center">
        <button
          onClick={RequestOpen}
          className="w-full bg-white rounded-2xl shadow-lg p-10 text-center 
                   hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 
                   cursor-pointer border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            ➕ {t("HelpRequests.addTitle")}
          </h2>
          <p className="text-gray-500 mt-2">{t("HelpRequests.addDesc")}</p>
        </button>

        <Link
          to="/helpRequests"
          className="w-full bg-white rounded-2xl shadow-lg p-10 text-center 
                   hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 
                   cursor-pointer border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            📂 {t("HelpRequests.showTitle")}
          </h2>
          <p className="text-gray-500 mt-2">{t("HelpRequests.showDesc")}</p>
        </Link>
      </div>
      <div>
        <RequestsForm />
      </div>
    </>
  );
};

export default CoustomHelpRequest;
