import { z } from "zod";

const createSocialInsuranceSchema = (t) => z.object({
  tax_identification_number: z
    .string()
    .min(1, t("validation.enterTaxNumber")),

  tax_bracket: z.enum(["1", "2", "3", "4", "5", "6"], {
    message: t("validation.enterTaxBracket"),
  }),

  social_insurance_number: z
    .string()
    .min(1, t("validation.enterSocialInsuranceNumber")),

  health_insurance_company_name: z
    .string()
    .min(1, t("validation.enterHealthInsuranceName")),

  health_insurance_number: z
    .string()
    .min(1, t("validation.enterHealthInsuranceNumber")),

  health_insurance_type: z.enum(["public", "private"], {
    message: t("validation.selectHealthInsuranceType"),
  }),

  number_of_children: z.coerce.number({
    required_error: t("validation.enterChildrenNumber"),
    invalid_type_error: t("validation.enterValidNumber"),
  }),

  marital_status: z.enum(["single", "married", "divorced", "widowed"], {
    message: t("validation.selectMaritalStatus"),
  }),
});

export default createSocialInsuranceSchema;
