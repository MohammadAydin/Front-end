import React from "react";
import DetailsList from "../DetailsList";
import { MdOutlineFileDownload } from "react-icons/md";

const InvoicesMain = () => {
  const number = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {number.map((i) => (
        <div className="InvoicesMain w-full flex items-center " key={i}>
          <div className="w-full">
            <DetailsList
              previousPage="invoices"
              index="t"
              avatarPhoto="t"
              name="t"
              email="t"
              specialist="t"
              orderDate="t"
              orderTime="t"
              address="t"
              PhoneNumber="t"
              price="t"
              total="t"
            />
          </div>
          <div className="invoicesDownload text-[25px] mb-2">
            <MdOutlineFileDownload />
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoicesMain;
