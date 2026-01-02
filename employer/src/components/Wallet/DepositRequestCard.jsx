import React from "react";
import { useTranslation } from "react-i18next";
import { MdPending, MdCheckCircle, MdCancel } from "react-icons/md";
import { FaFilePdf, FaFileImage } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

const DepositRequestCard = ({ deposit }) => {
  const { t } = useTranslation();

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return t("common.notAvailable");
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return t("common.notAvailable");
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          label: t("Wallet.depositStatus.pending"),
          icon: <MdPending className="text-yellow-500" />,
          bgColor: "bg-yellow-100 text-yellow-700",
          borderColor: "border-yellow-300",
        };
      case "approved":
        return {
          label: t("Wallet.depositStatus.approved"),
          icon: <MdCheckCircle className="text-green-500" />,
          bgColor: "bg-green-100 text-green-700",
          borderColor: "border-green-300",
        };
      case "rejected":
        return {
          label: t("Wallet.depositStatus.rejected"),
          icon: <MdCancel className="text-red-500" />,
          bgColor: "bg-red-100 text-red-700",
          borderColor: "border-red-300",
        };
      default:
        return {
          label: status,
          icon: null,
          bgColor: "bg-gray-100 text-gray-700",
          borderColor: "border-gray-300",
        };
    }
  };

  const statusConfig = getStatusConfig(deposit.status);
  const isImage = deposit.deposit_proof_url && /\.(jpg|jpeg|png)$/i.test(deposit.deposit_proof_url);
  const isPdf = deposit.deposit_proof_url && /\.pdf$/i.test(deposit.deposit_proof_url);

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${statusConfig.borderColor} overflow-hidden group`}>
      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Section - Deposit Info */}
          <div className="flex items-start gap-4 flex-1">
            {/* Icon Container */}
            <div className={`rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300 ${statusConfig.bgColor}`}>
              {statusConfig.icon}
            </div>

            {/* Deposit Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {t("Wallet.depositRequest")} #{deposit.id}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor}`}>
                  {statusConfig.label}
                </span>
              </div>

              {/* Amount */}
              <div className="mb-2">
                <span className="text-sm text-gray-500">{t("Wallet.amount")}: </span>
                <span className="text-xl font-bold text-[#F47621]">
                  {formatCurrency(deposit.amount)}
                </span>
              </div>

              {/* Dates */}
              <div className="space-y-1 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("Wallet.submittedAt")}:</span>{" "}
                  {formatDate(deposit.created_at)}
                </div>
                {deposit.approved_at && (
                  <div>
                    <span className="font-semibold">{t("Wallet.processedAt")}:</span>{" "}
                    {formatDate(deposit.approved_at)}
                  </div>
                )}
              </div>

              {/* Admin Note */}
              {deposit.admin_note && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    {t("Wallet.adminNote")}:
                  </p>
                  <p className="text-sm text-gray-800">{deposit.admin_note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions */}
          {deposit.deposit_proof_url && (
            <div className="flex items-center gap-3">
              <a
                href={deposit.deposit_proof_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                {isPdf ? (
                  <FaFilePdf size={18} />
                ) : isImage ? (
                  <FaFileImage size={18} />
                ) : null}
                <span className="hidden sm:inline">{t("Wallet.viewProof")}</span>
                <HiExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div
        className={`h-1 ${
          deposit.status === "pending"
            ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"
            : deposit.status === "approved"
            ? "bg-gradient-to-r from-green-500 via-green-600 to-green-500"
            : "bg-gradient-to-r from-red-500 via-red-600 to-red-500"
        }`}
      ></div>
    </div>
  );
};

export default DepositRequestCard;
