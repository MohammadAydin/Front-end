import useData from "../../hooks/useData";
import { TbClockHour5Filled } from "react-icons/tb";
import FilteringHours from "./FilteringHours";
import Chart from "./Chart";
import { useWorkingHoursStore } from "../../store/WorkingHoursStore";
import "../Responsive css/WorkingHours.css";
import vectorNoData from "../../assets/images/vectors/Time management-rafiki.svg";
import { useTranslation } from "react-i18next";
import useStatusAccount from "../../store/storeStatusAccount";
import { useEffect } from "react";
import statusAccount from "../../utils/statusAccountReturn";

const WorkingHours = () => {
  const { t, i18n } = useTranslation();
  const { rowData, getTotalHours, getDateRange } = useWorkingHoursStore();


  const { data } = useData("/worked/hours");
 const {
    data: statusData,
    errorstatus,
    isLoadingstatus,
  } = useData("/status/profile");

  const setStatus = useStatusAccount((state) => state.setStatus);
  const status = useStatusAccount((state) => state.status);

  const hasFilteredData = rowData.length > 0;
  const displayData = hasFilteredData ? rowData : data;
  const lastItem = displayData?.[displayData.length - 1];
  const dateRange = getDateRange();

  const formatMonthName = (monthNumber) => {
    const monthKey = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ][monthNumber - 1];
    return t(`workingHours.monthNames.${monthKey}`);
  };

  function formatDecimalHours(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours}h ${minutes}m`;
  }
  useEffect(() => {
    if (statusData?.status) {
      setStatus(statusData?.status);
    }
  }, [statusData, setStatus]);
  if (status !== "approved") {
    return statusAccount(status);
  }
  return (
    <div className="WorkingHours p-[28px] py-[58px]">
      <div className="font-bold ">
        <div className="flex justify-between mb-8 items-center">
          <h3 className="text-2xl font-bold">{t('workingHours.title')}</h3>
          <FilteringHours />
        </div>
        {displayData?.length == 0 && (
          <div className="flex flex-col justify-center items-center ">
            <img className="w-[400px]" src={vectorNoData} alt="" />
            <p className="text-xl">{t('workingHours.noDataMessage')}</p>
          </div>
        )}
        {displayData && displayData.length > 0 && (
          <>
            <div className="text-5xl mt-5 flex gap-3 items-center">
              <div className="border-2 border-[#F47621] rounded-full">
                <TbClockHour5Filled size={30} color="#F47621" />
              </div>
              {formatDecimalHours(
                hasFilteredData ? getTotalHours() : lastItem?.total_hours
              )}
            </div>
            <div className="text-[#919EAB] font-thin mt-4 text-lg">
              {t('workingHours.dateLabel')} &nbsp;
              {dateRange ? (
                dateRange
              ) : (
                <>
                  <span>
                    {formatMonthName(lastItem?.month)} {lastItem?.year}
                  </span>
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
