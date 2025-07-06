import React from "react";
import helpRequestDetails from "./helpIndex";
const RequestsDetailsTable = () => {
  return (
    <div>
      <div className=" rounded-md overflow-hidden text-[#0F1A43]">
        {/* Helpers */}
        <div className="TableField bg-white p-2 flex gap-6 items-start flex-wrap">
          <span className="font-bold w-42">Helpers</span>
          <div className="flex flex-col gap-3">
            {helpRequestDetails.helpers.map((helper, index) => (
              <div
                key={index}
                className="helpersDetails flex flex-wrap items-center gap-2"
              >
                <div className="text-sm flex items-center gap-1">
                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="font-bold w-48">{helper.name}</p>
                </div>

                <p className="w-40">{helper.position}</p>
                <p>{helper.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Helpers Number */}
        <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
          <span className="font-bold w-48">Helpers Number</span>
          <span>{helpRequestDetails.helpersNumber} Helpers</span>
        </div>

        {/* Position Details */}
        <div className="TableField bg-white p-2 flex">
          <span className="font-bold min-w-48">Position Details</span>
          <span>{helpRequestDetails.positionDetails}</span>
        </div>

        {/* Request Status */}
        <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
          <span className="font-bold w-48">Request Status</span>
          <span className="requestStatus px-2 py-0.5 bg-green-100 text-green-700 rounded text-sm">
            {helpRequestDetails.requestStatus}
          </span>
        </div>

        {/* Position Needed */}
        <div className="TableField bg-white p-2 flex">
          <span className="font-bold w-48">Position needed</span>
          <span>{helpRequestDetails.positionNeeded}</span>
        </div>

        {/* Dates */}
        <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
          <span className="font-bold w-48">Date From</span>
          <span>
            {new Date(helpRequestDetails.dateFrom).toLocaleDateString()}
          </span>
        </div>
        <div className="TableField bg-white p-2 flex">
          <span className="font-bold w-48">Date To</span>
          <span>
            {new Date(helpRequestDetails.dateTo).toLocaleDateString()}
          </span>
        </div>

        {/* Days Schedule */}
        <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
          <span className="font-bold block mb-2 w-46">Days Schedule</span>
          <table className="RequestsTable w-[60%] text-sm rounded overflow-hidden">
            <tbody>
              {helpRequestDetails.daysSchedule.map((dayItem) => (
                <tr key={dayItem.day}>
                  <td className="p-2 font-medium">{dayItem.day}</td>
                  {dayItem.shifts.length > 0 ? (
                    <>
                      <td className="p-2">{dayItem.shifts[0]}</td>
                      <td className="p-2">{dayItem.shifts[1] || "-"}</td>
                    </>
                  ) : (
                    <td colSpan={2} className="p-2 text-gray-500">
                      Leave day
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestsDetailsTable;
