import React from "react";
import useData from "../../hooks/useData";
import DetailsList from "./DetailsList";
import { useTranslation } from "react-i18next";
import { LuBanknote } from "react-icons/lu";
import { RiErrorWarningLine } from "react-icons/ri";

const InvoicesMain = () => {
  const { t } = useTranslation();
  const { data: invoices, isLoading, error } = useData("/invoices");

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
          {error?.response?.data?.message || "Failed to load invoices"}
        </p>
      </div>
    );
  }

  if (invoices?.data?.length === 0 || invoices?.data === null) {
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
                  <LuBanknote size={64} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
              {t("Invoices.noneInvoices")}
            </h3>

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
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {invoices?.data?.map((item, index) => (
        <DetailsList
          key={item?.id || index}
          id={item?.id}
          invoice_number={item?.invoice_number}
          from={item?.from}
          to={item?.to}
          total_amount={item?.total_amount}
          url={item?.url}
        />
      ))}
    </div>
  );
};

export default InvoicesMain;
