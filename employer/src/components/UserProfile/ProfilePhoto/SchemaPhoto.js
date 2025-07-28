import { z } from "zod";
import i18next from "../../../i18n";

// 3.1 MB
const MAX_FILE_SIZE = 3.1 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const ShemaPhoto = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: () => i18next.t('userProfileComponents.profilePhoto.validation.acceptedTypes'),
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: () => i18next.t('userProfileComponents.profilePhoto.validation.maxFileSize'),
    }),
});

export default ShemaPhoto;
