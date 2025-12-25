import React from "react";
import InvoiceDetailsHead from "../../components/Invoices/InvoiceDetailsHead";
import InvoiceDetailsMain from "../../components/Invoices/InvoiceDetailsMain";

const InvoiceDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <InvoiceDetailsHead />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <InvoiceDetailsMain />
      </div>
    </div>
  );
};

export default InvoiceDetails;
