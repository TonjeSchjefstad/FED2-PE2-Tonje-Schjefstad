import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getProfile, deleteBooking } from "../services/api";
import type { Profile } from "../types/profile";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ButtonLink from "../components/ui/ButtonLink";
import { House, MapPin } from "lucide-react";
import type { Booking } from "../types/booking";
import MyBookingsCard from "../components/profile/MyBookingsCard";
import type { Venue } from "../types/venue";
import MyVenueCard from "../components/profile/MyVenueCard";
import { deleteVenue } from "../services/api";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";
import VenueBookings from "../components/profile/VenueBookings";
import toast from "react-hot-toast";

/**
 * Profile page displays user information and allows navigation between bookings and venues.
 * Fetches profile data from the API.
 * Displays a users bookings, with the ability to delete them.
 * For venue managers, it also shows their venues with options to view bookings and delete venues.
 * Shows loading state and error handling.
 */
function Profile() {
  const { user, token, apiKey } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "venues">("bookings");

  const [venues, setVenues] = useState<Venue[]>([]);
  const [venueToDelete, setVenueToDelete] = useState<string | null>(null);
  const [isDeletingVenue, setIsDeletingVenue] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user || !token || !apiKey) return;
      try {
        const data = await getProfile(user.name, token, apiKey);
        setProfile(data);
        setBookings(data.bookings ?? []);
        setVenues(data.venues ?? []);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [user, token, apiKey]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleDeleteBooking = async (id: string) => {
    if (!token || !apiKey) return;
    try {
      await deleteBooking(id, token, apiKey);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted successfully");
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const handleDeleteVenue = async () => {
    if (!token || !apiKey || !venueToDelete) return;
    try {
      setIsDeletingVenue(true);
      await deleteVenue(venueToDelete, token, apiKey);
      setVenues((prev) => prev.filter((v) => v.id !== venueToDelete));
      setVenueToDelete(null);
      toast.success("Venue deleted successfully");
    } catch {
      toast.error("Failed to delete venue");
    } finally {
      setIsDeletingVenue(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-error">Profile not found</p>
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
                setActiveTab(e.target.value as "bookings" | "venues")
              }
            >
              <option value="bookings">My bookings</option>
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
            {/* My Bookings */}
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

            {/* My Venues ( Venue Managers) */}
            {activeTab === "venues" && (
              <div>
                {selectedVenue ? (
                  <VenueBookings
                    venueId={selectedVenue.id}
                    venueName={selectedVenue.name}
                    onBack={() => setSelectedVenue(null)}
                  />
                ) : (
                  <>
                    {venues.length === 0 ? (
                      <p className="text-text-muted text-sm">No venues yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {venues.map((venue) => (
                          <MyVenueCard
                            key={venue.id}
                            venue={venue}
                            onDelete={(id) => setVenueToDelete(id)}
                            onViewBookings={(id, name) =>
                              setSelectedVenue({ id, name })
                            }
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {venueToDelete && (
              <ConfirmDeleteModal
                message="Are you sure you want to delete this venue?"
                onConfirm={handleDeleteVenue}
                onCancel={() => setVenueToDelete(null)}
                isLoading={isDeletingVenue}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
