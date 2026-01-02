import React from "react";
import { useTranslation } from "react-i18next";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { FaTag } from "react-icons/fa";

const TransactionCard = ({ transaction }) => {
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

  const getTransactionTypeLabel = (type) => {
    const typeMap = {
      purchase: t("Wallet.transactionTypes.purchase"),
      deposit: t("Wallet.transactionTypes.deposit"),
    };
    return typeMap[type] || type;
  };

  const isPurchase = transaction.type === "purchase";
  const isDeposit = transaction.type === "deposit";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Section - Transaction Info */}
          <div className="flex items-start gap-4 flex-1">
            {/* Icon Container */}
            <div
              className={`rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                isPurchase
                  ? "bg-gradient-to-br from-red-400 to-red-600"
                  : "bg-gradient-to-br from-green-400 to-green-600"
              }`}
            >
              {isPurchase ? (
                <MdArrowDownward size={24} className="text-white" />
              ) : (
                <MdArrowUpward size={24} className="text-white" />
              )}
            </div>

            {/* Transaction Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {getTransactionTypeLabel(transaction.type)}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isPurchase
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isPurchase ? t("Wallet.debit") : t("Wallet.credit")}
                </span>
              </div>

              {/* Metadata */}
              {transaction.metadata && Object.keys(transaction.metadata).length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <FaTag className="text-[#F47621]" />
                  {transaction.metadata.offer_title && (
                    <span className="text-gray-800 font-medium">
                      {transaction.metadata.offer_title}
                    </span>
                  )}
                </div>
              )}

              {/* Date */}
              <div className="text-sm text-gray-500">
                {formatDate(transaction.created_at)}
              </div>
            </div>
          </div>

          {/* Right Section - Amount and Balance */}
          <div className="flex flex-col items-end gap-2">
            {/* Amount */}
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">{t("Wallet.amount")}</p>
              <p
                className={`text-2xl font-bold ${
                  isPurchase ? "text-red-600" : "text-green-600"
                }`}
              >
                {isPurchase ? "-" : "+"}
                {formatCurrency(Math.abs(transaction.amount))}
              </p>
            </div>

            {/* Balance Info */}
            <div className="text-right text-xs text-gray-500">
              <p>
                {t("Wallet.balanceBefore")}: {formatCurrency(transaction.before_balance)}
              </p>
              <p className="font-semibold text-gray-700">
                {t("Wallet.balanceAfter")}: {formatCurrency(transaction.after_balance)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Accent Bar */}
      <div
        className={`h-1 ${
          isPurchase
            ? "bg-gradient-to-r from-red-500 via-red-600 to-red-500"
            : "bg-gradient-to-r from-green-500 via-green-600 to-green-500"
        }`}
      ></div>
    </div>
  );
};

export default TransactionCard;
