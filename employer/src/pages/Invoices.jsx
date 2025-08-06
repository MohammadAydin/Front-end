import React from "react";
import InvoicesHeader from "../components/Invoices/InvoicesHeader";
import InvoicesMain from "../components/Invoices/InvoicesMain";
import "./Css Responsive/InvoicesResponsive.css";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import useStatusAccount from "../store/storeStatusAccount";
import statusAccount from "../utils/statusAccountReturn";
const Invoices = () => {
  if (localStorage.getItem("statusAccount") !== "approved") {
    return statusAccount(localStorage.getItem("statusAccount"));
  }

  return (
    <div className="Invoices p-[28px] py-[58px]">
      <CompletePersonalinfo />

      <div>
        <InvoicesHeader />
      </div>
      <div className="my-5">
        <InvoicesMain />
      </div>
    </div>
  );
};

export default Invoices;
