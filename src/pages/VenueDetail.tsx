import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Wifi, Car, Coffee, PawPrint, Users } from "lucide-react";
import { getVenue } from "../services/api";
import type { Venue } from "../types/venue";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import ImageCarousel from "../components/venue/ImageCarousel";
import mapPlaceholder from "../assets/map-placeholder.webp";

/**
 * VenueDetail page displaying full information about a single venue.
 * Fetches venue data including owner and bookings from the API.
 * Shows image carousel, description, amenities, booking card placeholder, map placeholder and host info.
 */
function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenue() {
      if (!id) return;
      try {
        const data = await getVenue(id);
        setVenue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  if (error || !venue) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-error">{error || "Venue not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
          { label: venue.name },
        ]}
      />

      {/* Image carousel */}
      <ImageCarousel images={venue.media} alt={venue.name} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Name and rating */}
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-3xl font-bold text-text-primary">
              {venue.name}
            </h1>
            <div className="flex items-center gap-1 text-text-primary">
              <Star size={18} fill="currentColor" />
              <span className="font-semibold">{venue.rating}</span>
            </div>
          </div>

          {/* Location */}
          <p className="text-text-muted mb-6">
            {venue.location.city}, {venue.location.country}
          </p>

          <hr className="border-border mb-6" />

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-semibold text-text-primary mb-2">
              Description
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              {venue.description}
            </p>
          </div>

          <hr className="border-border mb-6" />

          {/* Amenities */}
          <div className="mb-6">
            <h2 className="font-semibold text-text-primary mb-4">
              What's included
            </h2>
            <ul className="space-y-3">
              {venue.meta.wifi && (
                <li className="flex items-center gap-3 text-sm text-text-primary">
                  <Wifi size={18} className="text-text-muted" /> WiFi
                </li>
              )}
              {venue.meta.breakfast && (
                <li className="flex items-center gap-3 text-sm text-text-primary">
                  <Coffee size={18} className="text-text-muted" /> Breakfast
                </li>
              )}
              {venue.meta.parking && (
                <li className="flex items-center gap-3 text-sm text-text-primary">
                  <Car size={18} className="text-text-muted" /> Parking
                </li>
              )}
              {venue.meta.pets && (
                <li className="flex items-center gap-3 text-sm text-text-primary">
                  <PawPrint size={18} className="text-text-muted" /> Pets
                  allowed
                </li>
              )}
              <li className="flex items-center gap-3 text-sm text-text-primary">
                <Users size={18} className="text-text-muted" /> Max{" "}
                {venue.maxGuests} guests
              </li>
            </ul>
          </div>
        </div>

        {/* Booking card placeholder */}
        <div className="lg:w-80">
          <div className="bg-bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Check availability
            </h2>
            <p className="text-text-muted text-sm">
              Component will be added here
            </p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-8 w-full h-64 rounded-xl overflow-hidden">
        <img
          src={mapPlaceholder}
          alt="Map placeholder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hosted by */}
      {venue.owner && (
        <div className="mt-8 flex items-center gap-3">
          <img
            src={venue.owner.avatar?.url || ""}
            alt={venue.owner.avatar?.alt || venue.owner.name}
            className="w-10 h-10 rounded-full object-cover bg-bg-secondary"
          />
          <div>
            <p className="text-text-muted text-sm">Hosted by:</p>
            <p className="text-text-primary font-semibold">
              {venue.owner.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VenueDetail;
