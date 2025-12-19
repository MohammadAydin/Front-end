import { useState } from "react";
import { IoEyeOutline, IoEyeSharp, IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const DetailsList = ({ id, invoice_number, from, to, total_amount, url }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  // Fetch detailed invoice URL
  const { data: detailedInvoice, isLoading: isLoadingDetails } = useData(`/invoices/${id}/download/details`);

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "Invalid date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Section - Invoice Info */}
          <div className="flex items-start gap-4 flex-1">
            {/* Icon Container */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaFileInvoiceDollar className="text-2xl text-white" />
            </div>

            {/* Invoice Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-gray-800">
                  #{invoice_number}
                </h3>
                <span className="px-3 py-1 bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white text-xs font-semibold rounded-full">
                  Invoice
                </span>
              </div>

              {/* Date Range */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-500">From:</span>
                  <span className="text-gray-800">{formatDate(from)}</span>
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-500">To:</span>
                  <span className="text-gray-800">{formatDate(to)}</span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Total:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#F47621] to-[#ff8c42] bg-clip-text text-transparent">
                  {formatAmount(total_amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* View Details Button */}
            <button
              onClick={() => navigate(`/invoiceDetails/${id}`)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              title={t("Invoices.viewDetails")}
            >
              {isHovered ? (
                <IoEyeSharp size={20} className="text-[#F47621]" />
              ) : (
                <IoEyeOutline size={20} />
              )}
              <span className="hidden sm:inline">{t("Invoices.viewDetails")}</span>
            </button>

            {/* Download Summary Invoice */}
            <a
              href={url}
              download={"invoice.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              title={t("Invoices.downloadSummary")}
            >
              <MdOutlineFileDownload size={18} />
              <span className="hidden sm:inline">{t("Invoices.summary")}</span>
            </a>

            {/* Download Detailed Invoice */}
            {isLoadingDetails ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-300 text-white rounded-lg cursor-not-allowed">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="hidden sm:inline text-sm font-medium">{t("common.loading")}</span>
              </div>
            ) : detailedInvoice?.data?.url ? (
              <a
                href={detailedInvoice.data.url}
                download={`${invoice_number}_details.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                title={t("Invoices.downloadDetailed")}
              >
                <IoDocumentTextOutline size={16} />
                <span className="hidden sm:inline">{t("Invoices.detailed")}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Gradient Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-[#F47621] via-[#ff8c42] to-[#F47621]"></div>
    </div>
  );
};

export default DetailsList;
