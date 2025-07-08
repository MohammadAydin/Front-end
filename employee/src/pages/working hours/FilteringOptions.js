import dayjs from "dayjs";

const now = dayjs();

const FilteringHoursOptions = [
  { label: "Lifetime", value: "" },
  {
    label: "Last 14 days",
    value: now.subtract(14, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    label: "Last 28 days",
    value: now.subtract(28, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    label: "Last 90 days",
    value: now.subtract(90, "day").format("YYYY-MM-DD 00:00:00"),
  },
  {
    label: "Last 365 days",
    value: now.subtract(365, "day").format("YYYY-MM-DD 00:00:00"),
  },
];

export default FilteringHoursOptions;
