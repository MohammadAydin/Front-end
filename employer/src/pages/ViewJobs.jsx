import { useTranslation } from "react-i18next";
import HelpRequestsMain from "../components/HelpRequests/HelpRequestsMain";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import StatusAccount from "../utils/statusAccountReturn";

const ViewJobs = () => {
  const { t } = useTranslation();

  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }

  return (
    <div className="ViewJobs p-[28px] py-[58px]">
      <CompletePersonalinfo />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {t("ViewJobs.title")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("ViewJobs.subtitle")}
        </p>
      </div>

      {/* Service Requests List */}
      <div className="my-5">
        <HelpRequestsMain />
      </div>
    </div>
  );
};

export default ViewJobs;


