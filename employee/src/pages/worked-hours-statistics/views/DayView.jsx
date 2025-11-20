import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const DayView = ({ data, formatDecimalHours, selectedDate }) => {
  const { t } = useTranslation();

  if (!data || !data.tasks || data.tasks.length === 0) return null;

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "-";
    try {
      return dayjs(dateTimeString).format("HH:mm");
    } catch {
      return dateTimeString;
    }
  };

  const formatDate = (dateString) => {
    try {
      return dayjs(dateString).format("dddd, MMMM D, YYYY");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Summary Card */}
      <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">
              {formatDate(selectedDate)}
            </p>
            <p className="text-2xl font-bold">{data.day_name}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">
              {t("workedHoursStatistics.totalHours")}
            </p>
            <p className="text-3xl font-bold">{formatDecimalHours(data.total_hours)}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm">
            {t("workedHoursStatistics.tasksCompleted")}: {data.tasks.length}
          </p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold">{t("workedHoursStatistics.tasksDetails")}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.taskId")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.startTime")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.endTime")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.shiftTime")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.hoursWorked")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.tasks.map((task, index) => (
                <tr key={task.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(task.start_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(task.end_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.shift_time || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#F47621]">
                    {formatDecimalHours(task.hours_worked)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DayView;

