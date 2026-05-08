import { z } from "zod";

/**
 * Zod schema for validating the create venue form data.
 * This schema ensures that all required fields are present and correctly formatted before submission to the API.
 */
export const createVenueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number({ message: "Price must be a number" })
    .min(1, "Price must be at least 1"),
  maxGuests: z
    .number({ message: "Max guests must be a number" })
    .min(1, "Max guests must be at least 1"),
  rating: z.number().min(0).max(5).optional(),
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
  country: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  image1: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image2: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image3: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type CreateVenueFormData = z.infer<typeof createVenueSchema>;
