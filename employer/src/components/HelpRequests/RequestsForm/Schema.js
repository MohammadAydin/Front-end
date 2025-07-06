import { z } from "zod";

const RequestSchema = z.object({
  Title: z.string().min(1, { message: "Please enter a Title" }),
  Position: z.enum(["Option 1", "Option 2", "Option 3"], {
    message: "Please select a Position !",
  }),
  Description: z.string().min(1, { message: "Please enter Description" }),
  "Employee count": z.coerce
    .number()
    .min(1, { message: "Please enter valid count" }),
  Shifts: z.enum(["Option 1", "Option 2", "Option 3"], {
    message: "Please select a Shifts !",
  }),
  Address: z.enum(["Option 1", "Option 2", "Option 3"], {
    message: "Please select a Address !",
  }),
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
