import { z } from "zod";

const phoneSchema = z.object({
  phone_number: z
    .string()
    .min(6, "Phone number is too short")
    .max(17, "Phone number is too long"),
});

const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

export { phoneSchema, otpSchema };
