import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { createVenue } from "../services/api";
import {
  createVenueSchema,
  type CreateVenueFormData,
} from "../schemas/createVenueSchema";
import Button from "../components/ui/Button";
import ButtonLink from "../components/ui/ButtonLink";

/**
 * CreateVenue page for venue managers to create a new venue.
 * Uses React Hook Form and Zod for form validation.
 * On successful creation, navigates back to the profile page.
 */
function CreateVenue() {
  const { token, apiKey } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateVenueFormData>({
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const onSubmit = async (data: CreateVenueFormData) => {
    if (!token || !apiKey) return;
    try {
      setError(null);
      const media = [data.image1, data.image2, data.image3]
        .filter(Boolean)
        .map((url) => ({ url: url!, alt: data.name }));

      await createVenue(
        {
          name: data.name,
          description: data.description,
          price: data.price,
          maxGuests: data.maxGuests,
          rating: data.rating,
          meta: {
            wifi: data.wifi,
            parking: data.parking,
            breakfast: data.breakfast,
            pets: data.pets,
          },
          location: {
            country: data.country,
            address: data.address,
            city: data.city,
            zip: data.zip,
          },
          media,
        },
        token,
        apiKey
      );
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-bg-card rounded-xl border border-border p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-8 text-center">
          Create venue
        </h1>

        {error && (
          <p className="text-error text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Venue Details */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">
              Venue Details
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Venue name
                </label>
                <input
                  {...register("name")}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white resize-none"
                />
                {errors.description && (
                  <p className="text-error text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price and capacity */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">
              Price and capacity
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Price/night ($)
                </label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  placeholder="100"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
                {errors.price && (
                  <p className="text-error text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Max guests
                </label>
                <input
                  {...register("maxGuests", { valueAsNumber: true })}
                  type="number"
                  placeholder="6"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
                {errors.maxGuests && (
                  <p className="text-error text-xs mt-1">
                    {errors.maxGuests.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Rating
                </label>
                <input
                  {...register("rating", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="0"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["wifi", "parking", "breakfast", "pets"] as const).map(
                (key) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer text-sm text-text-primary capitalize"
                  >
                    <input
                      type="checkbox"
                      {...register(key)}
                      className="accent-button-primary cursor-pointer"
                    />
                    {key === "pets"
                      ? "Pets allowed"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Country
                </label>
                <input
                  {...register("country")}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Address
                </label>
                <input
                  {...register("address")}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  Zip code
                </label>
                <input
                  {...register("zip")}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
              <div>
                <label className="text-sm text-text-primary mb-1 block">
                  City
                </label>
                <input
                  {...register("city")}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">Images</h2>
            <div className="flex flex-col gap-3">
              {(["image1", "image2", "image3"] as const).map((key) => (
                <div key={key}>
                  <input
                    {...register(key)}
                    placeholder="http://example.com/image1.jpg"
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                  />
                  {errors[key] && (
                    <p className="text-error text-xs mt-1">
                      {errors[key]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="flex-1"
            >
              + Create venue
            </Button>
            <ButtonLink
              to="/profile"
              variant="outline"
              size="lg"
              className="flex-1 text-center"
            >
              Cancel
            </ButtonLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;
