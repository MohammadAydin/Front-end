import { z } from "zod";

const createBankingInfoSchema = (t, isUploaded) =>
  z.object({
    AcountHolder: z
      .string()
      .min(2, t("validation.accountHolderShort"))
      .max(100, t("validation.accountHolderLong")),

    BankName: z
      .string()
      .min(2, t("validation.bankNameShort"))
      .max(100, t("validation.bankNameLong")),

    BIC: z.string().min(2, t("validation.enterBIC")),
    // .regex(/^[A-Z0-9]{8}([A-Z0-9]{3})?$/, "Invalid BIC (e.g. DEUTDEFFXXX)"),

    IBAN: z.string().regex(
      /^DE\d{20}$/,
      // /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/
      t("validation.invalidIBAN")
    ),

    bankCard: isUploaded
      ? z.any().optional()
      : z.any().refine((file) => file instanceof File, {
          message: t("validation.uploadBankCard"),
        }),
  });

export default createBankingInfoSchema;
