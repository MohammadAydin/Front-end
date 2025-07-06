import { z } from "zod";

const MAX_SIZE_MB = 2;

const signatureSchema = z.object({
  signature: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please provide a signature",
    })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file?.type),
      {
        message: "Signature must be a PNG, JPG, or JPEG image",
      }
    )
    .refine((file) => file?.size <= MAX_SIZE_MB * 1024 * 1024, {
      message: `Signature must be less than ${MAX_SIZE_MB}MB`,
    }),
});

export default signatureSchema;
