import { z } from "zod";

export const shiftTimeSchema = z.object({
  shiftName: z.string().min(1, "Please enter Shift name"),

  fromTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid From time format (HH:MM)"),

  toTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid To time format (HH:MM)"),
});
// .refine(
//   (data) => {
//     const parseTime = (timeStr) => {
//       const [hoursStr, minutesStr] = timeStr.split(":");
//       const hours = parseInt(hoursStr, 10);
//       const minutes = parseInt(minutesStr, 10);
//       return hours * 60 + minutes;
//     };

//     const fromMinutes = parseTime(data.fromTime);
//     const toMinutes = parseTime(data.toTime);

//     return toMinutes > fromMinutes;
//   },
//   {
//     message: "End time must be after start time",
//     path: ["toTime"],
//   }
// );

export default shiftTimeSchema;
