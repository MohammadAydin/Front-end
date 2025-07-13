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

// You can add more validation schemas here as needed
export const createRegisterSchema = (t) => {
    return z.object({
        // Define register schema here when needed
    });
};
