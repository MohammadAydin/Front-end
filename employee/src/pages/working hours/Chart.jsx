import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const HoursChart = ({ rawData }) => {
  // if there is no data return null
  if (!rawData || rawData.length === 0) return null;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Data processing

  const chartData = rawData.map((item) => ({
    name: monthNames[item.month - 1],
    total_hours: parseFloat(item.total_hours),
  }));

  // Calculate the percentage increase

  const last = chartData[chartData.length - 1];
  const prev = chartData[chartData.length - 2];
  const lastValue = last?.total_hours || 0;
  const prevValue = prev?.total_hours || 0;

  const increasePercent =
    prevValue > 0
      ? (((lastValue - prevValue) / prevValue) * 100).toFixed(2)
      : 0;
  const isPositive = lastValue >= prevValue;

  return (
    <div className="w-full h-[400px] bg-white mt-10">
      {/* Title and attribution */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Working Hours</h2>
        <div
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isPositive ? "▲" : "▼"} {increasePercent}%
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e676" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00e676" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#555" }} />
          <YAxis tick={{ fontSize: 14, fill: "#555" }} />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="total_hours"
            stroke="#00e676"
            fillOpacity={1}
            fill="url(#colorHours)"
            strokeWidth={3}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoursChart;
