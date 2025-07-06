import { z } from "zod";

export const shiftTimeSchema = z
  .object({
    shiftName: z.string().min(1, "Please enter Shift name"),

    fromTime: z
      .string()
      .regex(/^(0?\d|1[0-2]):[0-5]\d$/, "Invalid From time format (HH:MM)"),
    fromPeriod: z.enum(["AM", "PM"]),

    toTime: z
      .string()
      .regex(/^(0?\d|1[0-2]):[0-5]\d$/, "Invalid To time format (HH:MM)"),
    toPeriod: z.enum(["AM", "PM"]),
  })
  .refine(
    (data) => {
      const parseTime = (timeStr, period) => {
        const [hoursStr, minutesStr] = timeStr.split(":");
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        return hours * 60 + minutes;
      };

      const fromMinutes = parseTime(data.fromTime, data.fromPeriod);
      const toMinutes = parseTime(data.toTime, data.toPeriod);

      return toMinutes > fromMinutes;
    },
    {
      message: "End time must be after start time",
      path: ["toTime"],
    }
  );

export default shiftTimeSchema;
