import { z } from "zod";

const createPhoneSchema = (t) => z.object({
  phone_number: z
    .string()
    .min(6, t("validation.phoneNumberShort"))
    .max(11, t("validation.phoneNumberLong")),
});

const createOtpSchema = (t) => z.object({
  code: z.string().length(6, t("validation.otpMustBe6Digits")),
});

export { createPhoneSchema, createOtpSchema };
