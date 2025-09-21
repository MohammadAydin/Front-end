import { z } from "zod";

const createDocumentFileUploadSchema = (t) => z.object({
  document: z.any().refine((file) => file instanceof File, {
    message: t("validation.uploadDocument"),
  }),
});

export default createDocumentFileUploadSchema;
