import React from "react";
import TasksInvoice from "./TasksInvoice";

const InvoiceDetailsList = ({
  id,
  invoice_number,
  from,
  to,
  amount,
  promoted_amount,
  total_amount,
  status,
  tasks,
}) => {
  return (
    <div className="my-10">
      <p className=" px-2 py-1 rounded-[5px]">
        invoice number : {invoice_number}
      </p>
      <p className="bg-gray-200 px-2 py-1  rounded-[5px]">from : {from}</p>
      <p className=" px-2 py-1 rounded-[5px]">to : {to}</p>
      <p className="bg-gray-200 px-2 py-1  rounded-[5px]">amount : {amount}</p>
      <p className=" px-2 py-1 rounded-[5px]">
        promoted amount : {promoted_amount}&euro;
      </p>
      <p className="bg-gray-200 px-2 py-1  rounded-[5px]">
        total amount : {total_amount}&euro;
      </p>
      <h2 className="mt-8 text-2xl font-bold">Invoice Tasks</h2>
      {tasks?.map((item) => (
        <TasksInvoice task={item} />
      ))}
    </div>
  );
};

export default InvoiceDetailsList;
