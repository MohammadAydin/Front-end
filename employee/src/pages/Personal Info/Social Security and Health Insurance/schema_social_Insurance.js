import { z } from "zod";

const schema_social_Insurance = z.object({
  tax_identification_number: z
    .string()
    .min(1, "Please enter your tax identification number"),

  tax_bracket: z.enum(["1", "2", "3", "4", "5", "6"], {
    message: "Please enter your tax bracket",
  }),

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

  number_of_children: z.coerce.number({
    required_error: "Please enter number of children",
    invalid_type_error: "Please enter a valid number",
  }),

  marital_status: z.enum(["single", "married", "divorced", "widowed"], {
    message: "Please select your marital status",
  }),
});

export default schema_social_Insurance;
