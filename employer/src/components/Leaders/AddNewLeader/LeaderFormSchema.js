import { z } from "zod";

// 3.1 MB
const MAX_FILE_SIZE = 3.1 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const createAddLeaderSchema = (t) => z.object({
  name: z.string().min(3, t("validation.nameRequired")),
  position: z.string().min(2, t("validation.positionRequired")),
  email: z.string().email(t("validation.invalidEmail")),
  PhoneNumber: z
    .string()
    .min(5, t("validation.invalidPhoneNumber"))
    .regex(/^\+?[0-9\s\-()]+$/, t("validation.invalidPhoneFormat")),
  password: z.string().min(6, t("validation.passwordMinLength")),
  avatar: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true;
      if (file instanceof File) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
      return true;
    }, t("validation.acceptedImageTypes"))
    .refine((file) => {
      if (!file) return true;
      if (file instanceof File) {
        return file.size <= MAX_FILE_SIZE;
      }
      return true;
    }, t("validation.maxFileSize")),
  permissions: z.array(z.string()).min(1, t("validation.selectPermission")),
});

export default createAddLeaderSchema;
