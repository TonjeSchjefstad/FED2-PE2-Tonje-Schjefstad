import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getVenue, updateVenue, deleteVenue } from "../services/api";
import {
  editVenueSchema,
  type EditVenueFormData,
} from "../schemas/editVenueSchema";
import Button from "../components/ui/Button";
import ButtonLink from "../components/ui/ButtonLink";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";
import toast from "react-hot-toast";

/**
 * EditVenue page for venue managers to update or delete an existing venue.
 * Pre-fills form with existing venue data fetched from the API.
 */
function EditVenue() {
  const { id } = useParams<{ id: string }>();
  const { user, token, apiKey } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditVenueFormData>({
    resolver: zodResolver(editVenueSchema),
    defaultValues: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  useEffect(() => {
    async function fetchVenue() {
      if (!id) return;
      try {
        const data = await getVenue(id);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("price", data.price);
        setValue("maxGuests", data.maxGuests);
        setValue("rating", data.rating);
        setValue("wifi", data.meta.wifi);
        setValue("parking", data.meta.parking);
        setValue("breakfast", data.meta.breakfast);
        setValue("pets", data.meta.pets);
        setValue("country", data.location.country || "");
        setValue("address", data.location.address || "");
        setValue("city", data.location.city || "");
        setValue("zip", data.location.zip || "");
        setValue("image1", data.media?.[0]?.url || "");
        setValue("image2", data.media?.[1]?.url || "");
        setValue("image3", data.media?.[2]?.url || "");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id, setValue]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onSubmit = async (data: EditVenueFormData) => {
    if (!token || !apiKey || !id) return;
    try {
      const media = [data.image1, data.image2, data.image3]
        .filter(Boolean)
        .map((url) => ({ url: url!, alt: data.name }));

      await updateVenue(
        id,
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
      toast.success("Venue updated successfully");
      navigate("/profile");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!token || !apiKey || !id) return;
    try {
      setIsDeleting(true);
      await deleteVenue(id, token, apiKey);
      toast.success("Venue deleted successfully");
      navigate("/profile");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-bg-card rounded-xl border border-border p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-8 text-center">
          Edit venue
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Venue Details */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">
              Venue Details
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Venue name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  autoComplete="off"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
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
                <label
                  htmlFor="price"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Price/night ($)
                </label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  id="price"
                  type="number"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
                {errors.price && (
                  <p className="text-error text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="maxGuests"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Max guests
                </label>
                <input
                  {...register("maxGuests", { valueAsNumber: true })}
                  id="maxGuests"
                  type="number"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
                {errors.maxGuests && (
                  <p className="text-error text-xs mt-1">
                    {errors.maxGuests.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Rating
                </label>
                <input
                  {...register("rating", { valueAsNumber: true })}
                  id="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
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
                    className="flex items-center gap-2 cursor-pointer text-sm text-text-primary"
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
                <label
                  htmlFor="country"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Country
                </label>
                <input
                  {...register("country")}
                  id="country"
                  autoComplete="country-name"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Address
                </label>
                <input
                  {...register("address")}
                  id="address"
                  autoComplete="street-address"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="text-sm text-text-primary mb-1 block"
                >
                  City
                </label>
                <input
                  {...register("city")}
                  id="city"
                  autoComplete="address-level2"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="text-sm text-text-primary mb-1 block"
                >
                  Zip code
                </label>
                <input
                  {...register("zip")}
                  id="zip"
                  autoComplete="postal-code"
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="font-semibold text-text-primary mb-4">Images</h2>
            <div className="flex flex-col gap-3">
              {(["image1", "image2", "image3"] as const).map((key, index) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="text-sm text-text-primary mb-1 block"
                  >
                    {index === 0 ? "Main image URL" : "Additional image URL"}
                  </label>
                  <input
                    {...register(key)}
                    id={key}
                    placeholder={
                      index === 0 ? "Main image URL" : "Additional image URL"
                    }
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
              Save
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

          {/* Delete venue */}
          <div className="border-t border-border pt-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full"
            >
              Delete venue
            </Button>
          </div>
        </form>
      </div>

      {showDeleteConfirm && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this venue?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}

export default EditVenue;
