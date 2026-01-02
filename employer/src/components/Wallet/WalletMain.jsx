import React, { useState } from "react";
import useData from "../../hooks/useData";
import TransactionCard from "./TransactionCard";
import DepositRequestCard from "./DepositRequestCard";
import { useTranslation } from "react-i18next";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";

const WalletMain = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("transactions");

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useData(
    "/employer/wallet/transactions"
  );

  const { data: depositRequests, isLoading: isLoadingDeposits, error: depositsError } = useData(
    "/employer/wallet/deposits"
  );

  const isLoading = activeTab === "transactions" ? isLoadingTransactions : isLoadingDeposits;
  const error = activeTab === "transactions" ? transactionsError : depositsError;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F47621]"></div>
        <p className="mt-4 text-gray-600">{t("common.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-100 rounded-full p-6 mb-4">
          <RiErrorWarningLine size={48} className="text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {t("common.error")}
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          {error?.response?.data?.message || "Failed to load transactions"}
        </p>
      </div>
    );
  }

  const transactionList = transactions?.data || [];
  const depositList = depositRequests?.data || [];

  const tabs = [
    {
      id: "transactions",
      label: t("Wallet.transactions"),
      count: transactionList.length,
    },
    {
      id: "deposits",
      label: t("Wallet.depositRequests"),
      count: depositList.length,
    },
  ];

  const getEmptyState = () => {
    const emptyMessages = {
      transactions: {
        title: t("Wallet.noTransactions"),
        description: t("Wallet.noTransactionsDescription"),
      },
      deposits: {
        title: t("Wallet.noDepositRequests"),
        description: t("Wallet.noDepositRequestsDescription"),
      },
    };

    const emptyMessage = emptyMessages[activeTab] || emptyMessages.transactions;

    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="relative max-w-md w-full">
          {/* Animated Background Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Main Card */}
          <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            {/* Icon Container */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full p-6">
                  <FaWallet size={64} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
              {emptyMessage.title}
            </h3>
            <p className="text-gray-600 text-center text-sm">
              {emptyMessage.description}
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-2 mt-6">
              <div
                className="w-2 h-2 bg-[#F47621] rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#F47621] rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentList = activeTab === "transactions" ? transactionList : depositList;
  const isEmpty = currentList.length === 0;

  return (
    <div className="WalletMain">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                ? "bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-300 text-gray-700"
                }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {isEmpty && !isLoading ? (
        getEmptyState()
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {activeTab === "transactions" ? (
            transactionList.map((transaction, index) => (
              <TransactionCard key={transaction?.id || index} transaction={transaction} />
            ))
          ) : (
            depositList.map((deposit, index) => (
              <DepositRequestCard key={deposit?.id || index} deposit={deposit} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WalletMain;
