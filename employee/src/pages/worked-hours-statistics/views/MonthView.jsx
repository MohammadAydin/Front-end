import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const MonthView = ({ data, formatDecimalHours, selectedYear, selectedMonth }) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  const chartData = data.map((item) => ({
    week: `${t("workedHoursStatistics.week")} ${item.week_number}`,
    hours: parseFloat(item.total_hours || 0),
    tasks: item.total_tasks || 0,
    dateRange: `${item.start_date} - ${item.end_date}`,
    weekNumber: item.week_number,
  }));

  const totalHours = data.reduce((sum, item) => sum + (item.total_hours || 0), 0);
  const totalTasks = data.reduce((sum, item) => sum + (item.total_tasks || 0), 0);
  const avgHours = data.length > 0 ? totalHours / data.length : 0;

  const monthName = t(`workingHours.monthNames.${[
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ][selectedMonth - 1]}`);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">
            {t("workedHoursStatistics.averageHoursPerWeek")}
          </p>
          <p className="text-2xl font-bold">{formatDecimalHours(avgHours)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">
            {t("workedHoursStatistics.totalHours")}
          </p>
          <p className="text-2xl font-bold">{formatDecimalHours(totalHours)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">
            {t("workedHoursStatistics.totalTasks")}
          </p>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">
          {t("workedHoursStatistics.weeklyBreakdown")} - {monthName} {selectedYear}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip
              formatter={(value) => formatDecimalHours(value)}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="hours" fill="#F47621" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold">{t("workedHoursStatistics.detailedView")}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.week")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.dateRange")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.hours")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.tasks")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.week}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.dateRange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDecimalHours(item.hours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.tasks}
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

export default MonthView;


