import React from "react";
import ShiftsList from "./ShiftsList";
import useData from "../../hooks/useData";

const ShiftsMain = () => {
  const { data } = useData("/employer/shifts");

  return (
    <div>
      
      {data?.data?.map((i) => (
        <ShiftsList
          key={i.id}
          id={i.id}
          name={i.name}
          startTime={i.start_time}
          endTime={i.end_time}
        />
      ))}
    </div>
  );
};

export default ShiftsMain;
