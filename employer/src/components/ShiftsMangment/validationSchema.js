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

export default shiftTimeSchema;
