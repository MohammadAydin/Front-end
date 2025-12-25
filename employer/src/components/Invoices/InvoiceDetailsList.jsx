import React from "react";
import { useTranslation } from "react-i18next";
import { FaFileInvoice, FaCalendarAlt, FaEuroSign, FaTag, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import TasksInvoice from "./TasksInvoice";

const InvoiceDetailsList = ({
  id,
  invoice_number,
  from,
  to,
  amount,
  promoted_amount,
  total_amount,
  status,
  tasks,
}) => {
  const { t } = useTranslation();

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "paid" || statusLower === "approved") {
      return {
        bg: "bg-gradient-to-r from-green-500 to-emerald-600",
        text: "text-white",
        icon: FaCheckCircle,
        label: t("Invoices.details.status.paid") || "Paid",
      };
    } else if (statusLower === "pending") {
      return {
        bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
        text: "text-white",
        icon: FaClock,
        label: t("Invoices.details.status.pending") || "Pending",
      };
    } else if (statusLower === "declined" || statusLower === "rejected") {
      return {
        bg: "bg-gradient-to-r from-red-500 to-rose-600",
        text: "text-white",
        icon: FaTimesCircle,
        label: t("Invoices.details.status.declined") || "Declined",
      };
    }
    return {
      bg: "bg-gradient-to-r from-gray-500 to-gray-600",
      text: "text-white",
      icon: FaClock,
      label: status || t("Invoices.details.status.unknown") || "Unknown",
    };
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Invoice Information Card */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#F47621]/10 to-[#ff8c42]/10 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-2.5">
              <FaFileInvoice className="text-white" size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {t("Invoices.details.invoiceInfo") || "Invoice Information"}
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Invoice Number */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <FaFileInvoice className="text-blue-600" size={16} />
                <span className="text-sm font-semibold text-gray-600">
                  {t("Invoices.details.invoiceNumber") || "Invoice Number"}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">{invoice_number}</p>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className="text-gray-600" size={16} />
                <span className="text-sm font-semibold text-gray-600">
                  {t("Invoices.details.status.label") || "Status"}
                </span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.text} shadow-md`}>
                <StatusIcon size={14} />
                <span className="text-sm font-semibold">{statusConfig.label}</span>
              </div>
            </div>

            {/* From Date */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-purple-600" size={16} />
                <span className="text-sm font-semibold text-gray-600">
                  {t("Invoices.details.from") || "From"}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{from}</p>
            </div>

            {/* To Date */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-100">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-cyan-600" size={16} />
                <span className="text-sm font-semibold text-gray-600">
                  {t("Invoices.details.to") || "To"}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{to}</p>
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <FaEuroSign className="text-green-600" size={16} />
                <span className="text-sm font-semibold text-gray-600">
                  {t("Invoices.details.amount") || "Amount"}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">{amount}€</p>
            </div>

            {/* Promoted Amount */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <FaTag className="text-orange-600" size={16} />
                <span className="text-sm font-semibold text-gray-600">
                  {t("Invoices.details.promotedAmount") || "Promoted Amount"}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{promoted_amount}€</p>
            </div>
          </div>

          {/* Total Amount - Highlighted */}
          <div className="mt-6 bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-xl p-6 border-2 border-[#F47621]/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                  <FaEuroSign className="text-white" size={20} />
                </div>
                <span className="text-lg md:text-xl font-bold text-white">
                  {t("Invoices.details.totalAmount") || "Total Amount"}
                </span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-white">{total_amount}€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      {tasks && tasks.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#F47621]/10 to-[#ff8c42]/10 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-2">
                <FaFileInvoice className="text-white" size={20} />
              </div>
              {t("Invoices.details.tasks.title") || "Invoice Tasks"}
              <span className="text-base font-normal text-gray-600 ml-2">
                ({tasks.length})
              </span>
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {tasks.map((item, index) => (
              <TasksInvoice key={item?.id || index} task={item} />
            ))}
          </div>
        </div>
      )}

      {(!tasks || tasks.length === 0) && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-gray-600 text-lg font-semibold">
            {t("Invoices.details.noTasks") || "No tasks found for this invoice"}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailsList;
