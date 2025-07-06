import { z } from "zod";

const bankingInfoSchema = z.object({
  AcountHolder: z
    .string()
    .min(2, "Account holder name is too short")
    .max(100, "Account holder name is too long"),

  BankName: z
    .string()
    .min(2, "Bank name is too short")
    .max(100, "Bank name is too long"),

  BIC: z
    .string()
    .regex(/^[A-Z0-9]{8}([A-Z0-9]{3})?$/, "Invalid BIC (e.g. DEUTDEFFXXX)"),

  IBAN: z.string().regex(
    /^DE\d{20}$/,
    // /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/
    "Invalid IBAN format (should start with DE and be 22 characters)"
  ),

  bankCard: z.any().refine((file) => file instanceof File, {
    message: "Please upload the bank card document!",
  }),
});

export default bankingInfoSchema;
