import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfile, deleteBooking } from "../services/api";
import type { Profile } from "../types/profile";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ButtonLink from "../components/ui/ButtonLink";
import { House, Heart, MapPin } from "lucide-react";
import type { Booking } from "../types/booking";
import MyBookingsCard from "../components/profile/MyBookingsCard";

/**
 * Profile page displays user information and allows navigation between bookings, favorites, and venues.
 * Fetches profile data from the API.
 * Displays a users bookings, with the ability to delete them.
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
        setBookings(data.bookings ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [user, token, apiKey]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleDeleteBooking = async (id: string) => {
    if (!token || !apiKey) return;
    try {
      await deleteBooking(id, token, apiKey);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className="p-4">
            {/* Mobile dropdown */}
            <select
              className="w-full md:hidden border border-border rounded-lg px-4 py-2 text-sm text-text-primary outline-none focus:border-brand-primary bg-white cursor-pointer"
              value={activeTab}
              onChange={(e) =>
                setActiveTab(
                  e.target.value as "bookings" | "favorites" | "venues"
                )
              }
            >
              <option value="bookings">My bookings</option>
              <option value="favorites">My favorites</option>
              {profile.venueManager && (
                <option value="venues">My venues</option>
              )}
            </select>

            {/* Desktop box tabs */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                  activeTab === "bookings"
                    ? "bg-bg-muted text-text-primary font-semibold border border-border"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                }`}
              >
                <House size={16} />
                My bookings
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                  activeTab === "favorites"
                    ? "bg-bg-muted text-text-primary font-semibold border border-border"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                }`}
              >
                <Heart size={16} />
                My favorites
              </button>
              {profile.venueManager && (
                <button
                  onClick={() => setActiveTab("venues")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                    activeTab === "venues"
                      ? "bg-bg-muted text-text-primary font-semibold border border-border"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                  }`}
                >
                  <MapPin size={16} />
                  My venues
                </button>
              )}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "bookings" && (
              <div>
                {(() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const upcoming = bookings.filter(
                    (b) => new Date(b.dateTo) >= today
                  );
                  const past = bookings.filter(
                    (b) => new Date(b.dateTo) < today
                  );

                  return (
                    <>
                      {/* Upcoming bookings */}
                      <h3 className="font-semibold text-text-primary mb-4">
                        Upcoming bookings
                      </h3>
                      {upcoming.length === 0 ? (
                        <p className="text-text-muted text-sm mb-6">
                          No upcoming bookings.
                        </p>
                      ) : (
                        <div className="space-y-3 mb-8">
                          {upcoming.map((booking) => (
                            <MyBookingsCard
                              key={booking.id}
                              booking={booking}
                              onDelete={handleDeleteBooking}
                            />
                          ))}
                        </div>
                      )}

                      {/* Past bookings */}
                      <h3 className="font-semibold text-text-primary mb-4">
                        Past bookings
                      </h3>
                      {past.length === 0 ? (
                        <p className="text-text-muted text-sm">
                          No past bookings.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {past.map((booking) => (
                            <MyBookingsCard
                              key={booking.id}
                              booking={booking}
                              onDelete={handleDeleteBooking}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {activeTab === "favorites" && (
              <p className="text-text-muted text-sm">
                My favorites will be displayed here.
              </p>
            )}

            {activeTab === "venues" && (
              <p className="text-text-muted text-sm">
                My venues will be displayed here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
