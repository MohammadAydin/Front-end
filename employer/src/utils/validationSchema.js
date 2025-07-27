import { z } from "zod";

// Custom validation schema factory that uses translation function
export const createLoginSchema = (t) => {
  return z.object({
    email: z
      .string({ message: t("login.email.validation.required") })
      .max(255, { message: t("login.email.validation.maxLength") })
      .email({ message: t("login.email.validation.invalid") }),
    password: z
      .string()
      .min(1, { message: t("login.password.validation.required") }),
  });
};

// You can add more schemas here for other forms
export const createSignupSchema = (t) => {
  return z.object({
    // Add signup validation fields here when needed
  });
};

// Create complete personal info validation schema with translations
export const createCompletePersonalInfoSchema = (t) => {
  return z.object({
    Username: z
      .string()
      .min(1, t("completePersonalInfo.validation.usernameRequired"))
      .min(3, t("completePersonalInfo.validation.usernameMinLength")),
    Bio: z.string().min(1, t("completePersonalInfo.validation.bioRequired")),
    Birthday: z
      .string()
      .min(1, t("completePersonalInfo.validation.birthdayRequired"))
      .regex(
        /^\d{2}\.\d{2}\.\d{4}$/,
        t("completePersonalInfo.validation.birthdayFormat")
      ),
    gender: z
      .string()
      .min(1, t("completePersonalInfo.validation.genderRequired")),
  });
};

// Create location validation schema with translations
export const createLocationSchema = (t) => {
    return z.object({
        street1: z.string().min(1, t('addLocation.validation.streetRequired')),
        postalcode: z
            .string()
            .min(4, t('addLocation.validation.postalCodeRequired'))
            .regex(/^\d+$/, t('addLocation.validation.postalCodeNumber')),
        country: z.string().min(1, t('addLocation.validation.countryRequired')),
        city: z.string().min(1, t('addLocation.validation.cityRequired')),
        street2: z.string().min(1, t('addLocation.validation.street2Required')),
    });
};