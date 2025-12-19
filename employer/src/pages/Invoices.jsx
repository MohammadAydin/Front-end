import React from "react";
import InvoicesHeader from "../components/Invoices/InvoicesHeader";
import InvoicesMain from "../components/Invoices/InvoicesMain";
import "./Css Responsive/InvoicesResponsive.css";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import useStatusAccount from "../store/storeStatusAccount";
import statusAccount from "../utils/statusAccountReturn";
import StatusAccount from "../utils/statusAccountReturn";
const Invoices = () => {
  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }

  return (
    <div className="Invoices p-4 md:p-6 lg:p-8 py-8 md:py-12 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <CompletePersonalinfo />

      <div className="max-w-7xl mx-auto">
        <InvoicesHeader />
        <div className="mt-6">
          <InvoicesMain />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
