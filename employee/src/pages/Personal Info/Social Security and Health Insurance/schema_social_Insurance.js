import { z } from "zod";

const schema_social_Insurance = z.object({
  tax_identification_number: z
    .string()
    .min(1, "Please enter your tax identification number"),

  // tax_bracket: z.enum(["1", "2", "3", "4", "5", "6"], {
  //   message: "Please enter your tax bracket",
  // }),

  social_insurance_number: z
    .string()
    .min(1, "Please enter your social insurance number"),

  health_insurance_company_name: z
    .string()
    .min(1, "Please enter your Social insurance company name"),

  health_insurance_number: z
    .string()
    .min(1, "Please enter your health insurance number"),

  health_insurance_type: z.enum(["public", "private"], {
    message: "Please select your health insurance type",
  }),

  // number_of_children: z.coerce
  //   .number()
  //   .transform((val) => (val ? Number(val) : undefined))
  //   .refine(
  //     (val) => val === undefined || val >= 0,
  //     "Must be a positive number"
  //   ),

  marital_status: z.enum(["single", "married", "divorced", "widowed"], {
    message: "Please select your marital status",
  }),

  children_documents: z
    .array(
      z
        .any()
        .refine(
          (fileList) => fileList?.length > 0,
          "Please upload the child's file"
        )
        .refine(
          (fileList) =>
            Array.from(fileList || []).every(
              (file) => file.size <= 2 * 1024 * 1024
            ),
          "Each file must be less than 2 MB"
        )
    )
    .optional(),
});

export default schema_social_Insurance;
