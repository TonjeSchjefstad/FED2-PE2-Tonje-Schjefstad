import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { Booking } from "../../types/booking";

interface MyBookingsCardProps {
  booking: Booking;
  onDelete: (id: string) => void;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1529686159790-3246c5082afb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

/**
 * MyBookingsCard component displays individual booking details in the profile page.
 * Receives booking data and a delete handler as props.
 * Calculates total price based on venue price and number of nights.
 * Formats dates to DD.MM.YY format.
 */
function MyBookingsCard({ booking, onDelete }: MyBookingsCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(booking.id);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  const nights = Math.ceil(
    (new Date(booking.dateTo).getTime() -
      new Date(booking.dateFrom).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const totalPrice = booking.venue?.price ? booking.venue.price * nights : 0;

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year.slice(2)}`;
  };

  return (
    <div className="flex items-center gap-4 bg-bg-card rounded-xl border border-border p-4">
      {/* Venue image */}
      <img
        src={booking.venue?.media?.[0]?.url || FALLBACK_IMAGE}
        alt={booking.venue?.name || "Venue"}
        className="w-20 h-20 rounded-lg object-cover bg-bg-secondary shrink-0"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      {/* Booking info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/venues/${booking.venue?.id}`}
          className="font-semibold text-text-primary hover:text-brand-primary transition-colors"
        >
          {booking.venue?.name}
        </Link>
        <p className="text-text-muted text-sm">
          {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
        </p>
        <p className="text-text-muted text-sm">{booking.guests} guests</p>
        <p className="text-text-primary text-sm font-semibold mt-1">
          ${totalPrice} total
        </p>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="text-red-400 hover:opacity-70 transition-opacity cursor-pointer shrink-0"
        aria-label="Delete booking"
      >
        <Trash2 size={18} />
      </button>

      {showConfirm && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this booking?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}

export default MyBookingsCard;
