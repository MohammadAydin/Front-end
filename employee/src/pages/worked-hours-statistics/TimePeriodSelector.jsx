import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuCalendar, LuCalendarDays, LuCalendarClock } from "react-icons/lu";

const TimePeriodSelector = ({
  viewType,
  setViewType,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedWeek,
  setSelectedWeek,
  selectedDate,
  setSelectedDate,
  rangeDates,
  setRangeDates,
}) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const getCurrentWeek = () => {
    return getWeekNumber(new Date());
  };

  const getWeeksInYear = (year) => {
    const date = new Date(year, 11, 31);
    const week = getWeekNumber(date);
    return week === 1 ? 52 : week;
  };

  const weeks = Array.from(
    { length: getWeeksInYear(selectedYear) },
    (_, i) => i + 1
  );

  const viewTypes = [
    { value: "year", label: t("workedHoursStatistics.viewTypes.year"), icon: LuCalendar },
    { value: "month", label: t("workedHoursStatistics.viewTypes.month"), icon: LuCalendarDays },
    { value: "week", label: t("workedHoursStatistics.viewTypes.week"), icon: LuCalendarClock },
    { value: "day", label: t("workedHoursStatistics.viewTypes.day"), icon: LuCalendar },
    { value: "range", label: t("workedHoursStatistics.viewTypes.range"), icon: LuCalendar },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        {/* View Type Selector */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("workedHoursStatistics.selectView")}
          </label>
          <div className="flex flex-wrap gap-2">
            {viewTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => {
                    setViewType(type.value);
                    if (type.value === "week" && !selectedWeek) {
                      setSelectedWeek(getCurrentWeek());
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    viewType === type.value
                      ? "bg-[#F47621] text-white border-[#F47621]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#F47621]"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Year Selector (shown for year, month, week views) */}
        {(viewType === "year" || viewType === "month" || viewType === "week") && (
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("workedHoursStatistics.selectYear")}
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(parseInt(e.target.value));
                if (viewType === "week" && !selectedWeek) {
                  setSelectedWeek(1);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Month Selector (shown for month view) */}
        {viewType === "month" && (
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("workedHoursStatistics.selectMonth")}
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {t(`workingHours.monthNames.${[
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
                  ][month - 1]}`)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Week Selector (shown for week view) */}
        {viewType === "week" && (
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("workedHoursStatistics.selectWeek")}
            </label>
            <select
              value={selectedWeek || getCurrentWeek()}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
            >
              {weeks.map((week) => (
                <option key={week} value={week}>
                  {t("workedHoursStatistics.week")} {week}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Selector (shown for day view) */}
        {viewType === "day" && (
          <div className="min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("workedHoursStatistics.selectDate")}
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
            />
          </div>
        )}

        {/* Range Selector (shown for range view) */}
        {viewType === "range" && (
          <>
            <div className="min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("workedHoursStatistics.fromDate")}
              </label>
              <input
                type="date"
                value={rangeDates.from || ""}
                onChange={(e) =>
                  setRangeDates({ ...rangeDates, from: e.target.value })
                }
                max={rangeDates.to || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
              />
            </div>
            <div className="min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("workedHoursStatistics.toDate")}
              </label>
              <input
                type="date"
                value={rangeDates.to || ""}
                onChange={(e) =>
                  setRangeDates({ ...rangeDates, to: e.target.value })
                }
                min={rangeDates.from}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimePeriodSelector;

