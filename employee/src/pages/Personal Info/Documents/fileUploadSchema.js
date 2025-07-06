import { z } from "zod";

const fileUploadSchema = z.object({
  document: z.any().refine((file) => file instanceof File, {
    message: "Please upload the document!",
  }),
});

export default fileUploadSchema;
