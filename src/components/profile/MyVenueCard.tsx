import { Link } from "react-router-dom";
import { Trash2, Star } from "lucide-react";
import type { Venue } from "../../types/venue";
import ButtonLink from "../ui/ButtonLink";
import Button from "../ui/Button";

interface MyVenueCardProps {
  venue: Venue;
  onDelete: (id: string) => void;
  onViewBookings: (id: string, name: string) => void;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1529686159790-3246c5082afb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

/**
 * MyVenueCard displays a single venue in the My Venues tab.
 * Shows venue image, name, location, price, and action buttons.
 * Venue managers can view bookings, edit or delete their venues.
 */
function MyVenueCard({ venue, onDelete, onViewBookings }: MyVenueCardProps) {
  return (
    <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
      {/* Venue image */}
      <img
        src={venue.media?.[0]?.url || FALLBACK_IMAGE}
        alt={venue.media?.[0]?.alt || venue.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      {/* Venue info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <Link
            to={`/venues/${venue.id}`}
            className="font-semibold text-text-primary hover:text-brand-primary transition-colors"
          >
            {venue.name}
          </Link>
          <div className="flex items-center gap-1 text-text-primary">
            <Star size={14} fill="currentColor" aria-hidden="true" />
            <span className="text-sm">{venue.rating}</span>
          </div>
        </div>

        <p className="text-text-muted text-sm mb-1">
          {venue.location.city}, {venue.location.country}
        </p>

        <p className="text-text-primary text-sm mb-4">
          <span className="font-semibold">${venue.price}</span>
          <span className="text-text-muted"> / Night</span>
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewBookings(venue.id, venue.name)}
          >
            View bookings
          </Button>

          <ButtonLink
            to={`/edit-venue/${venue.id}`}
            variant="outline"
            size="sm"
          >
            Edit
          </ButtonLink>
          <button
            type="button"
            onClick={() => onDelete(venue.id)}
            className="text-red-400 hover:opacity-70 transition-opacity cursor-pointer ml-auto"
            aria-label="Delete venue"
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyVenueCard;
