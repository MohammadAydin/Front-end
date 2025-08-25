import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import useData from "../../hooks/useData";
import DetailsList from "./DetailsList";
import { useTranslation } from "react-i18next";

const InvoicesMain = () => {
  const { t } = useTranslation();
  const { data: invoices } = useData("/invoices");
  console.log(invoices);
  if (invoices?.data?.length === 0 || invoices?.data === null) {
    return (
      <div className="flex  justify-center items-center h-[100vh]">
        {t("Invoices.noneInvoices")}
      </div>
    );
  }
  return (
    <>
      {invoices?.data?.map((item, index) => (
        <div className="InvoicesMain w-full flex items-center " key={index}>
          <div className="w-full">
            <DetailsList
              id={item?.id}
              invoice_number={item?.invoice_number}
              from={item?.from}
              to={item?.to}
              total_amount={item?.total_amount}
              url={item?.url}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoicesMain;
