import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import useData from "../../hooks/useData";
import DetailsList from "./DetailsList";

const InvoicesMain = () => {
  const { data: invoices } = useData("/invoices");
  return (
    <>
      {invoices?.data?.map((item, index) => (
        <div className="InvoicesMain w-full flex items-center " key={index}>
          <div className="w-full">
            <DetailsList
              id={item.id}
              invoice_number={item.invoice_number}
              from={item.from}
              to={item.to}
              total_amount={item.total_amount}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoicesMain;
