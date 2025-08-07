import { z } from "zod";

const residenceSchema = (isUploaded, t) =>
  z
    .object({
      has_work_permit: z
        .string()
        .optional()
        .refine((val) => val === "Yes" || val === "No" || !val, {
          message: t ? t("residenceInfo.validation.workPermitSelection") : "Please select if you have a work permit",
        }),

      nationality: z
        .string()
        .min(2, { message: t ? t("residenceInfo.validation.nationalityMinLength") : "Please enter your nationality" }),

      place_of_birth: z
        .string()
        .min(2, { message: t ? t("residenceInfo.validation.placeOfBirthRequired") : "Please enter your place of birth" }),

      permit_valid_until: z.string().optional(),

      id_front: isUploaded
        ? z.any().optional()
        : z.any().refine((file) => file instanceof File, {
            message: t ? t("residenceInfo.validation.uploadIdFront") : "Please upload front of id card here!",
          }),

      id_back: isUploaded
        ? z.any().optional()
        : z.any().refine((file) => file instanceof File, {
            message: t ? t("residenceInfo.validation.uploadIdBack") : "Please upload back of id card here!",
          }),

      permit_document: z.any().optional(),
    })
    .superRefine((data, ctx) => {
      const isGerman = data.nationality === "Germany";

      const permitValid = data.permit_valid_until?.trim();
      const hasPermit = data.has_work_permit?.trim();
      const doc = data.permit_document;

      if (isGerman) return;

      if (!doc || !(doc instanceof File)) {
        ctx.addIssue({
          path: ["permit_document"],
          message: t ? t("residenceInfo.validation.uploadPermitDocument") : "Please upload your permit document!",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!permitValid || !/^\d{4}\-\d{2}\-\d{2}$/.test(permitValid)) {
        ctx.addIssue({
          path: ["permit_valid_until"],
          message: t ? t("residenceInfo.validation.permitValidDateFormat") : "Please enter permit valid date in DD.MM.YYYY format",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!hasPermit || (hasPermit !== "Yes" && hasPermit !== "No")) {
        ctx.addIssue({
          path: ["has_work_permit"],
          message: t ? t("residenceInfo.validation.workPermitSelection") : "Please select if you have a work permit",
          code: z.ZodIssueCode.custom,
        });
      } else if (hasPermit === "No") {
        ctx.addIssue({
          path: ["has_work_permit"],
          message: t ? t("residenceInfo.validation.workPermitMustHave") : "You must have a work permit.",
          code: z.ZodIssueCode.custom,
        });
      }
    });

export default residenceSchema;
