import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().optional(), // رقم الهاتف اختياري
  message: z.string().min(1, "Message is required"),
});

export default contactSchema;
