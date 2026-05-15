import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Venue } from "../../types/venue";

interface VenueCardProps {
  venue: Venue;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1529686159790-3246c5082afb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

/**
 * VenueCard component displaying the basic information about a venue in a card format.
 * Shows the venue image, name, rating, location, and price per night.
 */
function VenueCard({ venue }: VenueCardProps) {
  const { id, name, media, rating, location, price } = venue;

  return (
    <Link
      to={`/venues/${id}`}
      className="block bg-bg-card rounded-xl max-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Venue image */}
      <img
        src={media[0]?.url || FALLBACK_IMAGE}
        alt={media[0]?.alt || name}
        className="w-full h-56 object-cover"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      {/* Venue information */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-text-primary text-lg">{name}</h3>
          <div className="flex items-center gap-1 text-text-primary">
            <Star size={14} fill="currentColor" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-2">
          {location.city}, {location.country}
        </p>

        <p className="text-text-primary pt-2">
          <span className="font-semibold text-lg">${price}</span>
          <span className="text-gray-500 text-sm"> / Night</span>
        </p>
      </div>
    </Link>
  );
}

export default VenueCard;
