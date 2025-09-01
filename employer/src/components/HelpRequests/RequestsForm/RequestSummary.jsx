import React from "react";
import { HiOutlineDocumentText, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineUserGroup, HiOutlineBriefcase, HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
import "./RequestSummary.css";
import { useTranslation } from "react-i18next";

const RequestSummary = ({ formData, dataPosation, dataShift, resultLocation }) => {
  const { t } = useTranslation();
  
  const getItemName = (id, dataArray) => {
    const item = dataArray?.find((item) => item.id === id);
    return item?.name || id;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  return (
    <div className="request-summary-container bg-white rounded-xl  border border-gray-100  transform transition-all duration-300  max-h-[70vh]  request-summary-scroll">
      {/* Header */}
      <div className="request-summary-header bg-gradient-to-r from-[#F47621] to-[#194894] text-white p-4 md:p-6 relative overflow-hidden sticky top-0 z-10">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex items-center gap-3">
          {/* <div className="bg-white bg-opacity-20 rounded-full p-2">
            <HiOutlineDocumentText size={24} className="md:w-7 md:h-7" />
          </div> */}
          <div>
            <h2 className="text-lg md:text-xl font-bold">{t("RequestsForm.summary.title")}</h2>
            <p className="text-orange-100 text-xs md:text-sm">{t("RequestsForm.summary.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="request-summary-content p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Basic Information */}
        <div className="request-summary-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Title */}
          <div className="request-summary-card bg-gradient-to-br from-[#F47621]/10 to-[#194894]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#F47621] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#F47621] rounded-full p-1">
                <HiOutlineDocumentText className="text-white" size={16} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.title")}</h3>
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">{formData?.Title}</p>
          </div>

          {/* Position */}
          <div className="request-summary-card bg-gradient-to-br from-[#194894]/10 to-[#F47621]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#194894] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#194894] rounded-full p-1">
                <HiOutlineBriefcase className="text-white" size={16} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.position")}</h3>
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {getItemName(formData?.Position, dataPosation)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="request-summary-card bg-gradient-to-br from-[#F47621]/10 to-[#194894]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#F47621] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-[#F47621] rounded-full p-1">
              <HiOutlineDocumentText className="text-white" size={16} />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.description")}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{formData?.Description}</p>
        </div>

        {/* Location and Shifts */}
        <div className="request-summary-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Location */}
          <div className="request-summary-card bg-gradient-to-br from-[#194894]/10 to-[#F47621]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#194894] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#194894] rounded-full p-1">
                <HiOutlineLocationMarker className="text-white" size={16} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.address")}</h3>
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {getItemName(formData?.Address, resultLocation)}
            </p>
          </div>

          {/* Shifts */}
          <div className="request-summary-card bg-gradient-to-br from-[#F47621]/10 to-[#194894]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#F47621] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#F47621] rounded-full p-1">
                <HiOutlineClock className="text-white" size={16} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.shifts")}</h3>
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {getItemName(formData?.Shifts, dataShift)}
            </p>
          </div>
        </div>

        {/* Employee Count and Date Range */}
        <div className="request-summary-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Employee Count */}
          <div className="request-summary-card bg-gradient-to-br from-[#194894]/10 to-[#F47621]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#194894] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#194894] rounded-full p-1">
                <HiOutlineUserGroup className="text-white" size={16} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.employeeCount")}</h3>
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {formData?.EmployeeCount} {formData?.EmployeeCount === 1 ? t("RequestsForm.employee.singular") : t("RequestsForm.employee.plural")}
            </p>
          </div>

          {/* Date Range */}
          <div className="request-summary-card bg-gradient-to-br from-[#F47621]/10 to-[#194894]/10 rounded-lg p-3 md:p-4 border-l-4 border-[#F47621] transform transition-all duration-200 hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#F47621] rounded-full p-1">
                <HiOutlineCalendar className="text-white" size={16} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{t("RequestsForm.fields.dateRange")}</h3>
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {formatDate(formData?.date?.from)} to {formatDate(formData?.date?.to)}
            </p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="request-summary-card bg-gradient-to-r from-[#F47621]/10 to-[#194894]/10 rounded-lg p-3 md:p-4 border border-[#F47621]/20 transform transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#194894] flex items-center gap-2 text-sm md:text-base">
                <HiOutlineCheckCircle className="text-[#F47621]" size={18} />
                {t("RequestsForm.summary.title")}
              </h3>
              <p className="text-[#194894]/70 text-xs md:text-sm">{t("RequestsForm.summary.verified")}</p>
            </div>
            <div className="bg-[#F47621]/20 rounded-full p-2 md:p-3 transform transition-all duration-200 hover:scale-110">
              <HiOutlineDocumentText className="text-[#194894] md:w-6 md:h-6" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSummary;
