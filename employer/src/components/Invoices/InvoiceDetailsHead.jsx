import React from "react";
import { useNavigate } from "react-router-dom";

const InvoiceDetailsHead = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-2xl font-bold flex">
        <p
          onClick={() => navigate(-1)}
          className="text-gray-500 click hover:text-black"
        >
          Invoices{" "}
        </p>
        <p>&nbsp; &larr; &nbsp;</p>
        <p> Invoice Details</p>
      </div>
    </>
  );
};

export default InvoiceDetailsHead;
