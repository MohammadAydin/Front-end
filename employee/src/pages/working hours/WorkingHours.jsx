import useData from "../../hooks/useData";
import { TbClockHour5Filled } from "react-icons/tb";
import FilteringHours from "./FilteringHours";
import Chart from "./Chart";
import { useWorkingHoursStore } from "../../store/WorkingHoursStore";
import "../Responsive css/WorkingHours.css";

const WorkingHours = () => {
  const { rowData, getTotalHours, getDateRange } = useWorkingHoursStore();

  const { data } = useData("/worked/hours");

  const hasFilteredData = rowData.length > 0;
  const displayData = hasFilteredData ? rowData : data;
  const lastItem = displayData?.[displayData.length - 1];
  const dateRange = getDateRange();

  return (
    <div className="WorkingHours p-[28px] py-[58px]">
      <div className="font-bold ">
        <div className="flex justify-between mb-8 items-center">
          <h3 className="text-2xl font-bold">Total Hours</h3>
          <FilteringHours />
        </div>

        {displayData && displayData.length > 0 && (
          <>
            <div className="text-5xl mt-5 flex gap-3 items-center">
              <div className="border-2 border-[#F47621] rounded-full">
                <TbClockHour5Filled size={30} color="#F47621" />
              </div>
              {hasFilteredData ? getTotalHours() : lastItem?.total_hours}h
            </div>
            <div className="text-[#919EAB] font-thin mt-4 text-lg">
              Date:
              {dateRange ? (
                dateRange
              ) : (
                <>
                  <span> {lastItem?.year}</span> -
                  <span> {lastItem?.month}</span>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <Chart rawData={displayData} />
    </div>
  );
};

export default WorkingHours;
