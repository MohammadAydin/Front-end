import { z } from "zod";

const MAX_SIZE_MB = 2;

const signatureSchema = (t) =>
  z.object({
    signature: z
      .instanceof(File, { message: "Please provide a signature" })

      .refine(
        (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        {
          message: t("signature.validation.invalidFormat"),
        }
      )
      .refine((file) => file.size <= MAX_SIZE_MB * 1024 * 1024, {
        message: t("signature.validation.fileTooLarge"),
      }),
  });

export default signatureSchema;
