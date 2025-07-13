import { z } from "zod";

// Custom validation schema factory that uses translation function
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

// You can add more schemas here for other forms
export const createSignupSchema = (t) => {
    return z.object({
        // Add signup validation fields here when needed
    });
};
