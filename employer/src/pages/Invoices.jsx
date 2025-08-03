import React from "react";
import InvoicesHeader from "../components/Invoices/InvoicesHeader";
import InvoicesMain from "../components/Invoices/InvoicesMain";
import "./Css Responsive/InvoicesResponsive.css";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
const Invoices = () => {
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
