import { z } from "zod";

// 3.1 MB
const MAX_FILE_SIZE = 3.1 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const AddLeaderSchema = z.object({
  name: z.string().min(3, "Name is required"),
  position: z.string().min(2, "Position is required"),
  email: z.string().email("Invalid email"),
  PhoneNumber: z
    .string()
    .min(5, "Invalid phone number")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true;
      if (file instanceof File) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
      return true;
    }, "Only .jpeg, .jpg, .png, .gif files are accepted")
    .refine((file) => {
      if (!file) return true;
      if (file instanceof File) {
        return file.size <= MAX_FILE_SIZE;
      }
      return true;
    }, "Max file size is 3.1 MB"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

export default AddLeaderSchema;
