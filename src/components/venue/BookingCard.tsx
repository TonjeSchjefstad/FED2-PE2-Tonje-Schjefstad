import { useState } from "react";
import { CalendarDays, Users } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import ButtonLink from "../ui/ButtonLink";
import AvailabilityCalendar from "./AvailabilityCalendar";
import BookingConfirmModal from "./BookingConfirmModal";
import { createBooking } from "../../services/api";
import type { Booking } from "../../types/booking";

interface BookingCardProps {
  venueId: string;
  price: number;
  maxGuests: number;
  bookings: Booking[];
}

/**
 * BookingCard component displayed on the venue detail page.
 * Allows logged-in customers to select dates and number of guests.
 * Shows a calendar modal to select dates, and a confirmation modal before booking.
 * Calculates total price based on selected dates and guests.
 * If successful, shows a confirmation message with link to profile bookings.
 * If user is not logged in, shows a blurred form with overlay.
 */
function BookingCard({
  venueId,
  price,
  maxGuests,
  bookings,
}: BookingCardProps) {
  const { isLoggedIn, token, apiKey } = useAuth();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const nights =
    dateFrom && dateTo
      ? Math.ceil(
          (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * price;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleBooking = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      setError(null);
      await createBooking(
        { dateFrom, dateTo, guests, venueId },
        token,
        apiKey ?? ""
      );
      setShowConfirm(false);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-bg-card rounded-xl p-10 border border-border relative overflow-hidden">
        {/* Blurred booking form */}
        <div className="opacity-50 pointer-events-none select-none">
          <h2 className="text-2xl font-bold text-text-primary mt-6 mb-6">
            Check availability
          </h2>
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-primary">
              <span className="text-xl font-bold">${price}</span>
              <span className="text-text-muted">/ night</span>
            </p>
          </div>
          <div className="border border-border rounded-lg px-4 py-3 mb-3 bg-white">
            <span className="text-sm text-text-muted">No dates selected</span>
          </div>
          <div className="border border-border rounded-lg px-4 py-3 mb-3 bg-white">
            <span className="text-sm text-text-muted">
              Select number of guests
            </span>
          </div>
          <p className="text-text-muted text-sm mb-4">
            Select booking dates and number of guests
          </p>
          <div className="w-full bg-button-primary rounded-lg py-3" />
        </div>

        {/* Overlay with message */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-8 text-center">
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Check availability
          </h2>
          <p className="text-text-muted text-sm mb-10">
            You need to be logged in to book this venue.
          </p>
          <ButtonLink
            to="/login"
            size="lg"
            className="w-full text-center block"
          >
            Sign In
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-bg-card rounded-xl p-10 border border-border text-center">
        <h2 className="text-xl font-bold text-text-primary mt-6 mb-2">
          Booking confirmed!
        </h2>
        <p className="text-text-muted text-sm mb-4">
          Your booking has been successfully made.
        </p>
        <ButtonLink
          to="/profile"
          variant="outline"
          size="lg"
          className="w-full text-center block mt-12"
        >
          View my bookings
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <div className="bg-bg-card rounded-xl p-10 shadow-md">
        <h2 className="text-2xl font-bold text-text-primary mt-6 mb-6">
          Check availability
        </h2>

        {/* Price and max guests */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-primary">
            <span className="text-xl font-bold">${price}</span>
            <span className="text-text-muted">/night</span>
          </p>
        </div>

        {/* Date field */}
        <button
          type="button"
          onClick={() => setShowCalendar(true)}
          className="w-full flex items-center gap-3 border border-border rounded-lg px-4 py-3 text-sm text-text-muted mb-3 hover:border-brand-primary transition-colors cursor-pointer bg-white"
        >
          <CalendarDays size={16} className="text-text-muted" />
          {dateFrom && dateTo
            ? `${formatDate(dateFrom)} → ${formatDate(dateTo)}`
            : "No dates selected"}
        </button>

        {/* Guests field */}
        <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-3 mb-3 bg-white">
          <Users size={16} className="text-text-muted" />
          <span className="text-sm text-text-muted flex-1">
            {guests > 0
              ? `${guests} guest${guests > 1 ? "s" : ""}`
              : "Select number of guests"}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="text-text-muted hover:text-brand-primary transition-colors cursor-pointer text-lg"
            >
              −
            </button>
            <span className="text-sm text-text-primary w-4 text-center">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
              className="text-text-muted hover:text-brand-primary transition-colors cursor-pointer text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Booking information text */}
        <p className="text-text-muted text-sm mb-4">
          Select booking dates and number of guests
        </p>

        {/* Price calculation */}
        {dateFrom && dateTo && (
          <div className="flex justify-between border-t border-b border-border py-3 text-sm mb-6">
            <span className="text-text-muted">
              ${price} × {nights} nights
            </span>
            <span className="font-bold text-text-primary">= ${totalPrice}</span>
          </div>
        )}
        {/* Error message */}
        {error && <p className="text-error text-sm mb-4">{error}</p>}

        <Button
          size="lg"
          disabled={!dateFrom || !dateTo}
          onClick={() => setShowConfirm(true)}
        >
          Book Now
        </Button>
      </div>

      {/* Calendar modal */}
      {showCalendar && (
        <AvailabilityCalendar
          bookings={bookings}
          onApply={(from, to) => {
            setDateFrom(from);
            setDateTo(to);
          }}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <BookingConfirmModal
          dateFrom={dateFrom}
          dateTo={dateTo}
          guests={guests}
          price={price}
          nights={nights}
          totalPrice={totalPrice}
          onConfirm={handleBooking}
          onCancel={() => setShowConfirm(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default BookingCard;
