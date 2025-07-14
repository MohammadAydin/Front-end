import { z } from "zod";

// Create validation schema with translations
export const createLoginSchema = (t) => {
    return z.object({
        email: z
            .string({ message: t('login.email.validation.required') })
            .max(255, { message: t('login.email.validation.maxLength') })
            .email({ message: t('login.email.validation.invalid') }),
        password: z
            .string()
            .min(1, { message: t('login.password.validation.required') }),
    });
};

// Create register validation schema with translations
export const createRegisterSchema = (t) => {
    const strongPassword = z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
            message: t('register.password.validation.weak'),
        });

    return z
        .object({
            firstname: z
                .string()
                .min(3, { message: t('register.firstName.validation.minLength') })
                .max(255, { message: t('register.firstName.validation.maxLength') }),
            lastname: z
                .string()
                .min(3, { message: t('register.lastName.validation.minLength') })
                .max(255, { message: t('register.lastName.validation.maxLength') }),
            email: z
                .string()
                .min(1, { message: t('register.email.validation.required') })
                .email({ message: t('register.email.validation.invalid') }),
            password: strongPassword,
            confirmPassword: z.string(),
        })
        .superRefine((val, ctx) => {
            if (val.password !== val.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t('register.confirmPassword.validation.mismatch'),
                    path: ["confirmPassword"],
                });
            }
        });
};

// Create forgot password validation schema with translations
export const createForgotPasswordSchema = (t) => {
    return z.object({
        email: z
            .string({ message: t('forgotPassword.email.validation.required') })
            .max(255, { message: t('forgotPassword.email.validation.maxLength') })
            .email({ message: t('forgotPassword.email.validation.invalid') }),
    });
};

// Create reset password validation schema with translations
export const createResetPasswordSchema = (t) => {
    const strongPassword = z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
            message: t('resetPassword.password.validation.weak'),
        });

    return z
        .object({
            password: strongPassword,
            confirmPassword: z.string(),
        })
        .superRefine((val, ctx) => {
            if (val.password !== val.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t('resetPassword.confirmPassword.validation.mismatch'),
                    path: ["confirmPassword"],
                });
            }
        });
};

// Create verify email validation schema with translations
export const createVerifyEmailSchema = (t) => {
    return z.object({
        code1: z.number().min(0).max(9, { message: t('verifyEmail.codeField.validation.required') }),
        code2: z.number().min(0).max(9),
        code3: z.number().min(0).max(9),
        code4: z.number().min(0).max(9),
        code5: z.number().min(0).max(9),
        code6: z.number().min(0).max(9),
    });
};

// Create personal info validation schema with translations
export const createPersonalInfoSchema = (t) => {
    return z.object({
        services: z.string().nonempty(t('personalInfo.services.validation.required')),
        Occupation: z.string().nonempty(t('personalInfo.occupation.validation.required')),
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
        title: z.string().min(1, t('addLocation.validation.titleRequired')),
    });
};

// Create work abilities distance validation schema with translations
export const createWorkAbilitiesSchema = (t) => {
    return z.object({
        distance: z
            .string()
            .min(1, t('workAbilities.distanceRequired'))
            .regex(/^\d+$/, t('workAbilities.distanceNumber')),
    });
};

// Create complete personal info validation schema with translations
export const createCompletePersonalInfoSchema = (t) => {
    return z.object({
        Username: z
            .string()
            .min(1, t('completePersonalInfo.validation.usernameRequired'))
            .min(3, t('completePersonalInfo.validation.usernameMinLength')),
        Bio: z
            .string()
            .min(1, t('completePersonalInfo.validation.bioRequired')),
        Birthday: z
            .string()
            .min(1, t('completePersonalInfo.validation.birthdayRequired'))
            .regex(/^\d{2}\.\d{2}\.\d{4}$/, t('completePersonalInfo.validation.birthdayFormat')),
        gender: z
            .string()
            .min(1, t('completePersonalInfo.validation.genderRequired')),
    });
};
