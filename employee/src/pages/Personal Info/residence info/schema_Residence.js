import { z } from "zod";

const residenceSchema = z
  .object({
    has_work_permit: z
      .string()
      .optional()
      .refine((val) => val === "Yes" || val === "No" || !val, {
        message: "Please select if you have a work permit",
      }),

    nationality: z
      .string()
      .min(2, { message: "Please enter your nationality" }),

    place_of_birth: z
      .string()
      .min(2, { message: "Please enter your place of birth" }),

    permit_valid_until: z.string().optional(),

    id_front: z.any().refine((file) => file instanceof File, {
      message: "Please upload front of id card here!",
    }),

    id_back: z.any().refine((file) => file instanceof File, {
      message: "Please upload back of id card here!",
    }),

    permit_document: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    const isGerman = data.nationality === "Germany";

    const permitValid = data.permit_valid_until?.trim();
    const hasPermit = data.has_work_permit?.trim();
    const doc = data.permit_document;

    // تجاهل التحقق بالكامل إذا ألماني
    if (isGerman) return;

    if (!doc || !(doc instanceof File)) {
      ctx.addIssue({
        path: ["permit_document"],
        message: "Please upload your permit document!",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!permitValid || !/^\d{2}\.\d{2}\.\d{4}$/.test(permitValid)) {
      ctx.addIssue({
        path: ["permit_valid_until"],
        message: "Please enter permit valid date in DD.MM.YYYY format",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!hasPermit || (hasPermit !== "Yes" && hasPermit !== "No")) {
      ctx.addIssue({
        path: ["has_work_permit"],
        message: "Please select if you have a work permit",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export default residenceSchema;
