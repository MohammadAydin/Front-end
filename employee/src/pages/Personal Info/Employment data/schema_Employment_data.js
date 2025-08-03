import { z } from "zod";

const Employment_schema = z.object({
  school_qualification: z.enum(
    [
      "Technical/Abitur",
      "Intermediate school leaving certificate",
      "Secondary/elementary school leaving certificate",
      "without school leaving certificate",
    ],
    { message: "Please select your highest school qualification" }
  ),

  vocational_training: z.enum(["true", "false"], {
    message: "Please select your vocational training status",
  }),

  pregnant: z.union([
    z.literal("true"),
    z.literal("false"),
    z.literal(""),
    z.null(),
  ]),
  corona: z.enum(["true", "false"], {
    message: "Please answer about Corona vaccine",
  }),

  hepatitis: z.enum(["true", "false"], {
    message: "Please answer about Hepatitis vaccine",
  }),

  over18: z.literal("true", {
    errorMap: () => ({ message: "Please confirm that you are over 18" }),
  }),

  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms and Conditions" }),
  }),
});

export default Employment_schema;
