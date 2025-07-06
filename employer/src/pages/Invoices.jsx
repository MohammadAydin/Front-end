import React from "react";
import InvoicesHeader from "../components/Invoices/InvoicesHeader";
import InvoicesMain from "../components/Invoices/InvoicesMain";
import "./Css Responsive/InvoicesResponsive.css";
const Invoices = () => {
  return (
    <div className="Invoices p-[28px] py-[58px]">
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
