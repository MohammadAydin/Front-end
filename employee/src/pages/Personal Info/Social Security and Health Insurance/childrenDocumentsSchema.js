import { z } from "zod";

const childrenDocumentsSchema = z.object({
  children_documents: z
    .array(
      z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "File size must be less than 2MB",
      })
    )
    .optional(),
});

export default childrenDocumentsSchema;
