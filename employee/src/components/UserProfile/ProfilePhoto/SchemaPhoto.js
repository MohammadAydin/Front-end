import { z } from "zod";

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
      message: "Only .jpeg, .jpg, .png, .gif files are accepted",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 3.1 MB",
    }),
});

export default ShemaPhoto;
