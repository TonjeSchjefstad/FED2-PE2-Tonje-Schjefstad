import { z } from "zod";

/**
 * Zod schema for the edit profile form.
 * Validates bio, avatar URL, avatar ALT and venueManager toggle.
 */
export const editProfileSchema = z.object({
  bio: z.string().optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  avatarAlt: z.string().optional(),
  venueManager: z.boolean(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
