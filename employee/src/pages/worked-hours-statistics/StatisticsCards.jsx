import { TbClockHour5Filled } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const StatisticsCards = ({ totalHours, totalTasks, formatDecimalHours }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Total Hours Card */}
      <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">
              {t("workedHoursStatistics.totalHours")}
            </p>
            <p className="text-4xl font-bold">{formatDecimalHours(totalHours)}</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <TbClockHour5Filled size={32} />
          </div>
        </div>
      </div>

      {/* Total Tasks Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">
              {t("workedHoursStatistics.totalTasks")}
            </p>
            <p className="text-4xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <IoCheckmarkDoneCircle size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;

