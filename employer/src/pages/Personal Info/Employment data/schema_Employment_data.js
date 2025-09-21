import { z } from "zod";

const createEmploymentSchema = (t) => z.object({
  school_qualification: z.enum(
    [
      "Technical/Abitur",
      "Intermediate school leaving certificate",
      "Secondary/elementary school leaving certificate",
      "without school leaving certificate",
    ],
    { message: t("validation.selectSchoolQualification") }
  ),

  vocational_training: z.enum(["true", "false"], {
    message: t("validation.selectVocationalTraining"),
  }),

  pregnant: z.enum(["true", "false"], {
    message: t("validation.selectPregnancyStatus"),
  }),

  corona: z.enum(["true", "false"], {
    message: t("validation.answerCoronaVaccine"),
  }),

  hepatitis: z.enum(["true", "false"], {
    message: t("validation.answerHepatitisVaccine"),
  }),

  over18: z.literal("true", {
    errorMap: () => ({ message: t("validation.confirmOver18") }),
  }),

  terms: z.literal(true, {
    errorMap: () => ({ message: t("validation.acceptTerms") }),
  }),
});

export default createEmploymentSchema;
