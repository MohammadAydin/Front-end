import { useTranslation } from "react-i18next";
import HelpRequestsMain from "../components/HelpRequests/HelpRequestsMain";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import StatusAccount from "../utils/statusAccountReturn";
import { FaBriefcase } from "react-icons/fa";

const ViewJobs = () => {
  const { t } = useTranslation();

  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }

  return (
    <div className="ViewJobs px-4 md:px-6 py-6">
      <CompletePersonalinfo />

      {/* Modern Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 md:p-8 mb-8 shadow-lg overflow-hidden animate-slide-up">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <FaBriefcase size={32} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {t("ViewJobs.title")}
            </h1>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-[68px]">
            {t("ViewJobs.subtitle")}
          </p>
        </div>
      </div>

      {/* Service Requests List */}
      <div className="my-5">
        <HelpRequestsMain />
      </div>
    </div>
  );
};

export default ViewJobs;


