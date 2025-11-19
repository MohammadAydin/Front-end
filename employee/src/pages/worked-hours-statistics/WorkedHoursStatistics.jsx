import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { TbClockHour5Filled } from "react-icons/tb";
import { LuCalendarX, LuTrendingUp } from "react-icons/lu";
import useStatusAccount from "../../store/storeStatusAccount";
import statusAccount from "../../utils/statusAccountReturn";
import TimePeriodSelector from "./TimePeriodSelector";
import YearView from "./views/YearView";
import MonthView from "./views/MonthView";
import WeekView from "./views/WeekView";
import DayView from "./views/DayView";
import RangeView from "./views/RangeView";
import StatisticsCards from "./StatisticsCards";
import "../Responsive css/WorkingHours.css";

const WorkedHoursStatistics = () => {
  const { t, i18n } = useTranslation();
  const [viewType, setViewType] = useState("year"); // year, month, week, day, range
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [rangeDates, setRangeDates] = useState({
    from: null,
    to: null,
  });

  const status = useStatusAccount((state) => state.status);

  // Year view query
  const {
    data: yearData,
    isLoading: yearLoading,
    refetch: refetchYear,
  } = useQuery({
    queryKey: ["worked-hours-year", selectedYear],
    queryFn: () =>
      customFetch
        .get("/worked/hours/year", {
          params: { year: selectedYear },
        })
        .then((res) => res.data.data),
    enabled: viewType === "year",
  });

  // Month view query
  const {
    data: monthData,
    isLoading: monthLoading,
    refetch: refetchMonth,
  } = useQuery({
    queryKey: ["worked-hours-month", selectedYear, selectedMonth],
    queryFn: () =>
      customFetch
        .get("/worked/hours/month", {
          params: { year: selectedYear, month: selectedMonth },
        })
        .then((res) => res.data.data),
    enabled: viewType === "month",
  });

  // Week view query
  const {
    data: weekData,
    isLoading: weekLoading,
    refetch: refetchWeek,
  } = useQuery({
    queryKey: ["worked-hours-week", selectedYear, selectedWeek],
    queryFn: () =>
      customFetch
        .get("/worked/hours/week", {
          params: { year: selectedYear, week: selectedWeek },
        })
        .then((res) => res.data.data),
    enabled: viewType === "week" && selectedWeek !== null,
  });

  // Day view query
  const {
    data: dayData,
    isLoading: dayLoading,
    refetch: refetchDay,
  } = useQuery({
    queryKey: ["worked-hours-day", selectedDate],
    queryFn: () =>
      customFetch
        .get("/worked/hours/day", {
          params: { date: selectedDate },
        })
        .then((res) => res.data.data),
    enabled: viewType === "day",
  });

  // Range view query
  const {
    data: rangeData,
    isLoading: rangeLoading,
    refetch: refetchRange,
  } = useQuery({
    queryKey: ["worked-hours-range", rangeDates.from, rangeDates.to],
    queryFn: () =>
      customFetch
        .get("/worked/hours/range", {
          params: {
            from_date: rangeDates.from,
            to_date: rangeDates.to,
          },
        })
        .then((res) => res.data.data),
    enabled: viewType === "range" && !!rangeDates.from && !!rangeDates.to,
  });

  useEffect(() => {
    // Refetch when view type changes
    if (viewType === "year") refetchYear();
    if (viewType === "month") refetchMonth();
    if (viewType === "week" && selectedWeek) refetchWeek();
    if (viewType === "day") refetchDay();
    if (viewType === "range" && rangeDates.from && rangeDates.to) refetchRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewType]);

  const formatDecimalHours = (decimal) => {
    if (!decimal) return "0h 0m";
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateTotalHours = () => {
    switch (viewType) {
      case "year":
        return yearData?.reduce((sum, item) => sum + (item.total_hours || 0), 0) || 0;
      case "month":
        return monthData?.reduce((sum, item) => sum + (item.total_hours || 0), 0) || 0;
      case "week":
        return weekData?.reduce((sum, item) => sum + (item.total_hours || 0), 0) || 0;
      case "day":
        return dayData?.total_hours || 0;
      case "range":
        return rangeData?.reduce((sum, item) => sum + (item.hours_worked || 0), 0) || 0;
      default:
        return 0;
    }
  };

  const calculateTotalTasks = () => {
    switch (viewType) {
      case "year":
        return yearData?.reduce((sum, item) => sum + (item.total_tasks || 0), 0) || 0;
      case "month":
        return monthData?.reduce((sum, item) => sum + (item.total_tasks || 0), 0) || 0;
      case "week":
        return weekData?.reduce((sum, item) => sum + (item.tasks_count || 0), 0) || 0;
      case "day":
        return dayData?.tasks?.length || 0;
      case "range":
        return rangeData?.length || 0;
      default:
        return 0;
    }
  };

  const isLoading =
    (viewType === "year" && yearLoading) ||
    (viewType === "month" && monthLoading) ||
    (viewType === "week" && weekLoading) ||
    (viewType === "day" && dayLoading) ||
    (viewType === "range" && rangeLoading);

  const hasData = () => {
    switch (viewType) {
      case "year":
        return yearData && yearData.length > 0;
      case "month":
        return monthData && monthData.length > 0;
      case "week":
        return weekData && weekData.length > 0;
      case "day":
        return dayData && dayData.total_hours > 0;
      case "range":
        return rangeData && rangeData.length > 0;
      default:
        return false;
    }
  };

  if (localStorage.getItem("statusAccount") !== "approved")
    return statusAccount(localStorage.getItem("statusAccount"));

  return (
    <div className="WorkedHoursStatistics p-[28px] py-[58px]">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {t("workedHoursStatistics.title")}
        </h2>
        <p className="text-gray-600">
          {t("workedHoursStatistics.subtitle")}
        </p>
      </div>

      <TimePeriodSelector
        viewType={viewType}
        setViewType={setViewType}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        rangeDates={rangeDates}
        setRangeDates={setRangeDates}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F47621]"></div>
        </div>
      ) : !hasData() ? (
        <div className="flex flex-col justify-center items-center py-20 px-4">
          <div className="relative max-w-md w-full">
            {/* Animated Background Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
              {/* Icon Container */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full p-6">
                    <LuCalendarX size={64} className="text-white" />
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
                {t("workedHoursStatistics.noDataTitle")}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {t("workedHoursStatistics.noDataDescription")}
              </p>
              
              {/* Decorative Elements */}
              <div className="flex justify-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#F47621] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#F47621] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              {/* Suggestion */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <LuTrendingUp className="text-[#F47621] mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">{t("workedHoursStatistics.tip")}:</span>{" "}
                    {t("workedHoursStatistics.noDataTip")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <StatisticsCards
            totalHours={calculateTotalHours()}
            totalTasks={calculateTotalTasks()}
            formatDecimalHours={formatDecimalHours}
          />

          <div className="mt-8">
            {viewType === "year" && (
              <YearView data={yearData} formatDecimalHours={formatDecimalHours} />
            )}
            {viewType === "month" && (
              <MonthView
                data={monthData}
                formatDecimalHours={formatDecimalHours}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
              />
            )}
            {viewType === "week" && (
              <WeekView
                data={weekData}
                formatDecimalHours={formatDecimalHours}
                selectedYear={selectedYear}
                selectedWeek={selectedWeek}
              />
            )}
            {viewType === "day" && (
              <DayView
                data={dayData}
                formatDecimalHours={formatDecimalHours}
                selectedDate={selectedDate}
              />
            )}
            {viewType === "range" && (
              <RangeView
                data={rangeData}
                formatDecimalHours={formatDecimalHours}
                rangeDates={rangeDates}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkedHoursStatistics;

