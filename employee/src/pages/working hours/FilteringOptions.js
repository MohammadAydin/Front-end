import dayjs from "dayjs";

const now = dayjs();
const startDate = dayjs("2025-01-01").format("YYYY-MM-DD 00:00:00");

const FilteringHoursOptions = [
  {
    key: "last7Days",
    label: "Last 7 days",
    value: "",
  },
  {
    key: "last14Days",
    label: "Last 14 days",
    value: now.subtract(14, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    key: "last28Days",
    label: "Last 28 days",
    value: now.subtract(28, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    key: "last90Days",
    label: "Last 90 days",
    value: now.subtract(90, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    key: "last365Days",
    label: "Last 365 days",
    value: now.subtract(365, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    key: "lifetime",
    label: "Lifetime",
    value: startDate
  },
];

export default FilteringHoursOptions;
