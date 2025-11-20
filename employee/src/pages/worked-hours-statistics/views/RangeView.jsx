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
import dayjs from "dayjs";

const RangeView = ({ data, formatDecimalHours, rangeDates }) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  const chartData = data.map((item) => ({
    date: item.start_at ? dayjs(item.start_at).format("MMM DD") : "-",
    fullDate: item.start_at ? dayjs(item.start_at).format("YYYY-MM-DD") : "-",
    hours: parseFloat(item.hours_worked || 0),
    shiftTime: item.shift_time || "-",
    id: item.id,
  }));

  const totalHours = data.reduce((sum, item) => sum + (item.hours_worked || 0), 0);
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
            {t("workedHoursStatistics.totalDays")}
          </p>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">
          {t("workedHoursStatistics.hoursBreakdown")} ({rangeDates.from} - {rangeDates.to})
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value) => formatDecimalHours(value)}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fullDate;
                }
                return label;
              }}
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
                  {t("workedHoursStatistics.date")}
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
              {chartData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.fullDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shiftTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#F47621]">
                    {formatDecimalHours(item.hours)}
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

export default RangeView;

