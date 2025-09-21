import { z } from "zod";

const MAX_SIZE_MB = 2;

const createSignatureSchema = (t) =>
  z.object({
    signature: z
      .instanceof(File, { message: t("validation.provideSignature") })

      .refine(
        (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        {
          message: t("validation.invalidFormat"),
        }
      )
      .refine((file) => file.size <= MAX_SIZE_MB * 1024 * 1024, {
        message: t("validation.fileTooLarge"),
      }),
  });

export default createSignatureSchema;
