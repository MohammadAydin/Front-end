import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WeekView = ({ data, formatDecimalHours, selectedYear, selectedWeek }) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  const chartData = data.map((item) => ({
    day: item.day_name,
    date: item.date,
    hours: parseFloat(item.total_hours || 0),
    tasks: item.tasks_count || 0,
    shiftTime: item.shift_time || "-",
  }));

  const totalHours = data.reduce((sum, item) => sum + (item.total_hours || 0), 0);
  const totalTasks = data.reduce((sum, item) => sum + (item.tasks_count || 0), 0);
  const avgHours = data.length > 0 ? totalHours / data.length : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-1">
            {t("workedHoursStatistics.averageHoursPerDay")}
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
          {t("workedHoursStatistics.dailyBreakdown")} - {t("workedHoursStatistics.week")}{" "}
          {selectedWeek}, {selectedYear}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F47621" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#F47621" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value) => formatDecimalHours(value)}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return `${label} (${payload[0].payload.date})`;
                }
                return label;
              }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#F47621"
              fillOpacity={1}
              fill="url(#colorHours)"
              strokeWidth={2}
            />
          </AreaChart>
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
                  {t("workedHoursStatistics.day")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.hours")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.tasks")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("workedHoursStatistics.shiftTime")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.day}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDecimalHours(item.hours)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.tasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shiftTime}
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

export default WeekView;

