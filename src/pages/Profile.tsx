import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../services/api";
import type { Profile } from "../types/profile";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ButtonLink from "../components/ui/ButtonLink";
import { House, Heart, MapPin } from "lucide-react";

/**
 * Profile page displays user information and allows navigation between bookings, favorites, and venues.
 * Fetches profile data from the API.
 * Shows loading state and error handling.
 */
function Profile() {
  const { user, token, apiKey } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "bookings" | "favorites" | "venues"
  >("bookings");

  useEffect(() => {
    async function fetchProfile() {
      if (!user || !token || !apiKey) return;
      try {
        const data = await getProfile(user.name, token, apiKey);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [user, token, apiKey]);

  if (isLoading) return <LoadingSpinner />;

  if (error || !profile) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-error">{error || "Profile not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile card */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-bg-card rounded-xl border border-border p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={profile.avatar?.url || ""}
                alt={profile.avatar?.alt || profile.name}
                className="w-20 h-20 rounded-full object-cover bg-bg-secondary mb-3"
              />
              <h1 className="font-bold text-text-primary text-lg">
                {profile.name}
              </h1>
              <p className="text-text-muted text-sm">{profile.email}</p>
              <p className="text-text-muted text-sm mt-3">
                {profile.venueManager ? "Venue Manager" : "Customer"}
              </p>
              {profile.bio && (
                <p className="text-text-muted text-sm mt-4">{profile.bio}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 max-w-xs mx-auto w-full">
              {profile.venueManager && (
                <ButtonLink to="/create-venue" size="md">
                  New Venue
                </ButtonLink>
              )}
              <ButtonLink to="/edit-profile" variant="outline" size="md">
                Edit Profile
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Content container */}
        <div className="flex-1 bg-bg-card rounded-xl border border-border overflow-hidden">
          {/* Navigation */}
          <div className="flex ">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === "bookings"
                  ? "border-brand-primary text-brand-primary font-semibold"
                  : "border-transparent text-text-primary hover:text-brand-primary"
              }`}
            >
              <House size={16} />
              My bookings
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === "favorites"
                  ? "border-brand-primary text-brand-primary font-semibold"
                  : "border-transparent text-text-primary hover:text-brand-primary"
              }`}
            >
              <Heart size={16} />
              My favorites
            </button>
            {profile.venueManager && (
              <button
                onClick={() => setActiveTab("venues")}
                className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors cursor-pointer border-b-2 -mb-px ${
                  activeTab === "venues"
                    ? "border-brand-primary text-brand-primary font-semibold"
                    : "border-transparent text-text-primary hover:text-brand-primary"
                }`}
              >
                <MapPin size={16} />
                My venues
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-text-muted text-sm">
              {activeTab === "bookings" && "My bookings"}
              {activeTab === "favorites" && "My favorites"}
              {activeTab === "venues" && "My venues "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
