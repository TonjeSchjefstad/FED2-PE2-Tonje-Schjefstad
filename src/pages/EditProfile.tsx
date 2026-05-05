import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getProfile, updateProfile } from "../services/api";
import {
  editProfileSchema,
  type EditProfileFormData,
} from "../schemas/editProfileSchema";
import Button from "../components/ui/Button";
import ButtonLink from "../components/ui/ButtonLink";

/**
 * EditProfile page for updating user profile information.
 * Allows users to update bio, avatar and venue manager status.
 * Pre-fills form with existing profile data
 * On success, navigates back to profile page.
 */
function EditProfile() {
  const { user, token, apiKey } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      bio: "",
      avatarUrl: "",
      venueManager: user?.venueManager ?? false,
    },
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user || !token || !apiKey) return;
      try {
        const data = await getProfile(user.name, token, apiKey);
        setValue("bio", data.bio || "");
        setValue("avatarUrl", data.avatar?.url || "");
        setValue("venueManager", data.venueManager);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }

    fetchProfile();
  }, [user, token, apiKey, setValue]);

  const venueManager = useWatch({ control, name: "venueManager" });

  const onSubmit = async (data: EditProfileFormData) => {
    if (!user || !token || !apiKey) return;
    try {
      await updateProfile(
        user.name,
        {
          bio: data.bio || undefined,
          avatar: data.avatarUrl
            ? {
                url: data.avatarUrl,
                alt: data.avatarAlt || `${user.name} avatar`,
              }
            : undefined,
          venueManager: data.venueManager,
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
          Edit profile
        </h1>

        {error && (
          <p className="text-error text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Bio */}
          <div>
            <label className="text-sm font-semibold text-text-primary mb-1 block">
              Bio
            </label>
            <textarea
              {...register("bio")}
              placeholder="Bio"
              rows={4}
              className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white resize-none"
            />
            {errors.bio && (
              <p className="text-error text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="text-sm font-semibold text-text-primary mb-1 block">
              Avatar
            </label>
            <input
              {...register("avatarUrl")}
              placeholder="http://example.com/image1.jpg"
              className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
            />
            {errors.avatarUrl && (
              <p className="text-error text-xs mt-1">
                {errors.avatarUrl.message}
              </p>
            )}
          </div>

          {/* Avatar alt text */}
          <div>
            <label className="text-sm font-semibold text-text-primary mb-1 block">
              Avatar alt text
            </label>
            <input
              {...register("avatarAlt")}
              placeholder="A description of your avatar image"
              className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
            />
          </div>

          {/* Venue Manager/Customer toggle */}
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setValue("venueManager", !venueManager)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer shrink-0 mt-0.5 ${
                venueManager ? "bg-button-primary" : "bg-border"
              }`}
              aria-label="Toggle Venue Manager"
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  venueManager ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Venue Manager
              </p>
              <p className="text-text-muted text-xs mt-1">
                {venueManager
                  ? "Unchecking this will change your account to a Customer account"
                  : "Checking this will change your account to a Venue Manager account"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="flex-1"
            >
              Update profile
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

export default EditProfile;
