import { z } from "zod";

/**
 * Zod schema for the login form.
 * Validates email and password fields.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .endsWith("@stud.noroff.no", "Must be a stud.noroff.no email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
