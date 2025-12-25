import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/image/Img_Avatar.25.svg";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import useData from "../../hooks/useData";
import { BsEye } from "react-icons/bs";
import { FaUser, FaClock, FaStickyNote, FaTag, FaEuroSign, FaFilePdf } from "react-icons/fa";

const TasksInvoice = ({ task }) => {
  const { t } = useTranslation();
  const [detailsTask, setDetailsTask] = useState(false);
  const {
    data: pdfDetails,
    errorpdf,
    isLoadnigpdf,
  } = useData(`/invoices/${task?.id}/download/details`);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 md:p-6 border border-gray-200 hover:border-[#F47621]/30 hover:shadow-lg transition-all duration-300 group">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Title Section */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-[#F47621] transition-colors duration-300 break-words">
            {task?.title}
          </h3>
        </div>

        {/* Employee Section */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 flex-shrink-0">
          <div className="relative">
            <img
              className="rounded-full w-12 h-12 border-2 border-white shadow-md object-cover"
              src={task?.employee?.photo || avatar}
              alt={task?.employee?.name || "Employee"}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {task?.employee?.name || t("Invoices.details.tasks.employee.unknown") || "Unknown"}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {task?.employee?.occupation || t("Invoices.details.tasks.employee.noOccupation") || "No occupation"}
            </p>
          </div>
        </div>

        {/* Work Hours */}
        <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl px-4 py-2 border border-purple-100 flex-shrink-0">
          <FaClock className="text-purple-600" size={16} />
          <div>
            <p className="text-xs text-gray-600 font-semibold">
              {t("Invoices.details.tasks.workHours") || "Work Hours"}
            </p>
            <p className="text-sm font-bold text-gray-800">{task?.work_hours} {t("Invoices.details.tasks.hours") || "h"}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* View PDF Button */}
          {pdfDetails?.data?.url && (
            <a
              href={pdfDetails?.data?.url}
              download
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              title={t("Invoices.details.tasks.viewPdf") || "View PDF"}
            >
              <BsEye size={18} />
            </a>
          )}

          {/* Toggle Details Button */}
          <button
            onClick={() => setDetailsTask(!detailsTask)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={detailsTask ? (t("Invoices.details.tasks.hideDetails") || "Hide Details") : (t("Invoices.details.tasks.showDetails") || "Show Details")}
          >
            {detailsTask ? <TfiArrowCircleUp size={20} /> : <TfiArrowCircleDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          detailsTask ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-4 border-t border-gray-200 space-y-4">
          {/* Notes */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <FaStickyNote className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  {t("Invoices.details.tasks.notes") || "Notes"}
                </p>
                <p className="text-sm text-gray-600">
                  {task?.notes || t("Invoices.details.tasks.noNotes") || "No notes available"}
                </p>
              </div>
            </div>
          </div>

          {/* Promotions */}
          {task?.promotions && task.promotions.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-start gap-3">
                <FaTag className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    {t("Invoices.details.tasks.promotions") || "Promotions"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {task.promotions.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-green-200 text-sm font-medium text-gray-700 shadow-sm"
                      >
                        {item?.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Amount Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <FaEuroSign className="text-blue-600" size={14} />
                <span className="text-xs font-semibold text-gray-600">
                  {t("Invoices.details.tasks.amount") || "Amount"}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">{task?.amount}€</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center gap-2 mb-1">
                <FaTag className="text-orange-600" size={14} />
                <span className="text-xs font-semibold text-gray-600">
                  {t("Invoices.details.tasks.promotedAmount") || "Promoted"}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">{task?.promoted_amount}€</p>
            </div>

            <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-xl p-4 border-2 border-[#F47621]/20 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <FaEuroSign className="text-white" size={14} />
                <span className="text-xs font-semibold text-white">
                  {t("Invoices.details.tasks.total") || "Total"}
                </span>
              </div>
              <p className="text-xl font-bold text-white">{task?.total}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksInvoice;
