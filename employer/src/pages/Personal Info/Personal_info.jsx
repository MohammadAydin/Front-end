import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useData from "../../hooks/useData";
import customFetch from "../../utils/axios";
import PersonalSections from "./Personal_info_index";

import Status from "./Status";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { TbFileCheck } from "react-icons/tb";

import "../Responsive css/Personal_info.css";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Personal_info = () => {
  const [allCompleted, setAlCompleted] = useState(false);
  const { data: statusData } = useData("/profile/status");

  const { t } = useTranslation();

  const navigate = useNavigate();
  const personalSections = PersonalSections();

  useEffect(() => {
    if (!statusData?.data) return;

    const entries = Object.entries(statusData.data).filter(
      ([key]) => key !== "isUploadedAllProfile"
    );

    const allApproved = entries.every(([_, value]) => value === "approved");

    setAlCompleted(allApproved);
  }, [statusData]);

  const sendAllInfo = useMutation({
    mutationFn: () => customFetch.post("profile/submit/review"),

    onSuccess: () => {
      navigate("/");
      toast.success("Successfully sent all personal info");
      // Show a success message or trigger refetch if needed
    },
    onError: (error) => {
      console.error("Failed to send info:", error);
      // Optional: show error to user
    },
  });

  const handleSendAll = () => {
    sendAllInfo.mutate();
  };

  const renderActionButton = ({ status_name, path }) => {
    const status = statusData?.data?.[status_name];

    if (status_name === "isUploadedAllProfile") return null;

    if (
      status === "missing" ||
      status === "declined" ||
      status === "rejected"
    ) {
      return (
        <div className="declinedStatus flex flex-col sm:flex-row sm:flex-row-reverse items-stretch sm:items-center gap-3 sm:gap-4 w-full">
          <button
            onClick={() => navigate(`${path}`)}
            className="group bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
          >
            {t("PersonalSections.button.Complete")}
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </button>
          <div className="flex justify-center sm:justify-start">
            <Status status={status} />
          </div>
        </div>
      );
    }

    if (status === "uploaded") {
      return (
        <div className="declinedStatus flex flex-col sm:flex-row sm:flex-row-reverse items-stretch sm:items-center gap-3 sm:gap-4 w-full">
          <button
            onClick={() => {
              status_name == "location"
                ? navigate("/editLocation?uploaded=true")
                : navigate(`${path}?uploaded=true`);
            }}
            className="group bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
          >
            {t("PersonalSections.button.Edit")}
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </button>
          <div className="flex justify-center sm:justify-start">
            <Status status={status} />
          </div>
        </div>
      );
    }

    return <Status status={status} />;
  };

  return (
    <div className="Personal_info_page min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-b-3xl p-6 md:p-8 relative overflow-hidden shadow-lg animate-slide-down">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <TbFileCheck className="text-white" size={32} />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
              {t("PersonalSections.title")}
            </h2>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-0 md:ml-16">
            Complete your profile information to get started
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Sections List */}
        <div className="space-y-4 animate-slide-up">
          {personalSections.map(
            ({ icon: Icon, label, path, status_name }, index) => (
              <div
                key={index}
                className="Personal_info_Item bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#F47621]/30 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-xl p-2.5 md:p-3 group-hover:from-[#F47621]/20 group-hover:to-[#ff8c42]/20 transition-all duration-300 flex-shrink-0">
                      <Icon className="text-[#F47621] group-hover:scale-110 transition-transform duration-300" size={24} />
                    </div>
                    <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 group-hover:text-[#F47621] transition-colors duration-300 break-words flex-1">
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center justify-start sm:justify-end w-full">
                    {renderActionButton({ status_name, path })}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Send All Button */}
        {!allCompleted && (
          <div className="mt-8 animate-slide-up" style={{ animationDelay: `${personalSections.length * 50}ms` }}>
            <button
              disabled={
                !statusData?.data?.isUploadedAllProfile || sendAllInfo.isPending
              }
              onClick={handleSendAll}
              className={`w-full text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 ${statusData?.data?.isUploadedAllProfile && !sendAllInfo.isPending
                ? "bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white hover:shadow-xl"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              {sendAllInfo.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("PersonalSections.button.send.Sending")}</span>
                </>
              ) : (
                <>
                  <TbFileCheck size={24} />
                  <span>{t("PersonalSections.button.send.Sendall")}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <SuccsessPopup />
    </div>
  );
};

export default Personal_info;
