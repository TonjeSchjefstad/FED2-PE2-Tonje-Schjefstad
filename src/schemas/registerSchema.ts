import { z } from "zod";

/**
 * Zod schema for the register form.
 * Validates name, email (stud.noroff.no), password and confirm password.
 */
export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .endsWith("@stud.noroff.no", "Must be a stud.noroff.no email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
