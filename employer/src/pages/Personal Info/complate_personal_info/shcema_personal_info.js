import { z } from "zod";

const createPersonalInfoSchema = (t) => z.object({
  gender: z.string().min(1, t("validation.selectGender")),
  Username: z.string().min(1, t("validation.enterUsername")),
  Bio: z.string().optional(),
  Birthday: z
    .string()
    .regex(
      /^\d{2}\.\d{2}\.\d{4}$/,
      t("validation.enterBirthDate")
    )
    .refine(
      (value) => {
        const [day, month, year] = value.split(".").map(Number);
        const date = new Date(year, month - 1, day);
        // التحقق أن التاريخ منطقي ويطابق المدخل تمامًا
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      },
      {
        message: t("validation.validDate"),
      }
    ),

  //   BirthDate: z
  // .string()
  // .regex(
  //   /^\d{4}\/\d{1,2}\/\d{1,2}$/,
  //   "Please enter birth date in the format YYYY/M/D"
  // ),
});

export default createPersonalInfoSchema;
