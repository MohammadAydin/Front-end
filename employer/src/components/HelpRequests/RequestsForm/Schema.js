import { z } from "zod";

const RequestSchema = (t) =>
  z.object({
    Title: z.string(),
    Position: z.number(),
    Description: z.string(),
    Shifts: z.number(),
    Address: z.number(),
    EmployeeCount: z.number().min(1).max(10),
    date: z
      .object({
        from: z.date({ required_error: t("validation.startDateRequired") }),
        to: z.date({ required_error: t("validation.endDateRequired") }),
      })
      .refine((data) => data.from && data.to, {
        message: t("validation.validDateRange"),
      }),
  });

export default RequestSchema;
