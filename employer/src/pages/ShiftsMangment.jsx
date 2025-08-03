import React, { useState } from "react";
import ShiftsHeader from "../components/ShiftsMangment/ShiftsHeader";
import ShiftsMain from "../components/ShiftsMangment/ShiftsMain";
import AddShiftsForm from "../components/ShiftsMangment/AddShiftsForm";
import "./Css Responsive/ShiftsResponsive.css";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
const ShiftsMangment = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (isFormOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return (
    <div className="ShiftsMangment p-[28px] py-[58px]">
      <CompletePersonalinfo />

      <div>
        <ShiftsHeader setIsFormOpen={setIsFormOpen} />
      </div>
      <div className="my-5">
        <ShiftsMain />
      </div>
      <AddShiftsForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </div>
  );
};

export default ShiftsMangment;
