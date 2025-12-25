import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoArrowBack } from "react-icons/io5";
import { FaFileInvoice } from "react-icons/fa";

const InvoiceDetailsHead = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4 animate-slide-down">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        aria-label={t("common.back") || "Back"}
      >
        <IoArrowBack size={20} />
      </button>
      <div className="flex items-center gap-3">
        <div className="bg-white/20 rounded-xl p-2.5 backdrop-blur-sm">
          <FaFileInvoice className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span
              onClick={() => navigate(-1)}
              className="hover:underline cursor-pointer transition-all duration-300"
            >
              {t("Invoices.title") || "Invoices"}
            </span>
            <span className="text-white/80">/</span>
            <span>{t("Invoices.details.title") || "Invoice Details"}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsHead;
