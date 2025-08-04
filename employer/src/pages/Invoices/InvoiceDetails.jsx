import React from "react";
import InvoiceDetailsHead from "../../components/Invoices/InvoiceDetailsHead";
import InvoiceDetailsMain from "../../components/Invoices/InvoiceDetailsMain";

const InvoiceDetails = () => {
  return (
    <div className="p-[28px] py-[58px]">
      <InvoiceDetailsHead />
      <div className="my-5">
        <InvoiceDetailsMain />
      </div>
    </div>
  );
};

export default InvoiceDetails;
