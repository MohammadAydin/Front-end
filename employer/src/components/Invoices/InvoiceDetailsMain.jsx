import React from "react";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import InvoiceDetailsList from "./InvoiceDetailsList";

const InvoiceDetailsMain = () => {
  const { id } = useParams();
  const { data: invoiceDetails, error, isLoading } = useData(`/invoice/${id}`);
  console.log(invoiceDetails);
  console.log(invoiceDetails?.invoice_number);
  return (
    <>
      <InvoiceDetailsList
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
    </>
  );
};

export default InvoiceDetailsMain;
