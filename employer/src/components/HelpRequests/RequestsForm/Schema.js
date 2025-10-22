import { z } from "zod";

const RequestSchema = (t) =>
  z.object({
    // Title: z.string(),
    Position: z.number(),
    // Description: z.string(),
    Shifts: z.number(),
    Address: z.number(),
    EmployeeCount: z.number().min(1).max(10),
    date: z
      .object({
        from: z.date({ required_error: "Start date is required" }),
        to: z.date({ required_error: "End date is required" }),
      })
      .refine((data) => data.from && data.to, {
        message: "Please select a valid date range",
      }),
  });

export default RequestSchema;
