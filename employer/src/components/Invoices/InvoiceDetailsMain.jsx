import React from "react";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InvoiceDetailsList from "./InvoiceDetailsList";

const InvoiceDetailsMain = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: invoiceDetails, error, isLoading } = useData(`/invoice/${id}`);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-slide-up">
        <div className="w-16 h-16 border-4 border-[#F47621] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">{t("common.loading") || "Loading..."}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 text-center animate-slide-up">
        <p className="text-red-600 text-lg font-semibold">
          {t("Invoices.details.errorLoading") || "Error loading invoice details"}
        </p>
        <p className="text-red-500 text-sm mt-2">{error.message || t("common.error") || "An error occurred"}</p>
      </div>
    );
  }

  if (!invoiceDetails?.data) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 text-center animate-slide-up">
        <p className="text-gray-600 text-lg font-semibold">
          {t("Invoices.details.notFound") || "Invoice not found"}
        </p>
      </div>
    );
  }

  return (
    <InvoiceDetailsList
      key={invoiceDetails?.data?.id}
      id={invoiceDetails?.data?.id}
      invoice_number={invoiceDetails?.data?.invoice_number}
      from={invoiceDetails?.data?.from}
      to={invoiceDetails?.data?.to}
      amount={invoiceDetails?.data?.amount}
      promoted_amount={invoiceDetails?.data?.promoted_amount}
      total_amount={invoiceDetails?.data?.total_amount}
      status={invoiceDetails?.data?.status}
      tasks={invoiceDetails?.data?.tasks}
    />
  );
};

export default InvoiceDetailsMain;
