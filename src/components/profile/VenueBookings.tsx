import { useEffect, useState } from "react";
import { getVenue } from "../../services/api";
import type { Booking } from "../../types/booking";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/Button";

interface VenueBookingsProps {
  venueId: string;
  venueName: string;
  onBack: () => void;
}

/**
 * VenueBookings component shows upcoming bookings with guest name, dates and number of guests.
 * Displayed inside the My Venues tab on the Profile page.
 */
function VenueBookings({ venueId, venueName, onBack }: VenueBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getVenue(venueId);
        setBookings(data.bookings ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [venueId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = bookings.filter((b) => new Date(b.dateTo) >= today);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year.slice(2)}`;
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return <p className="text-error text-sm">{error}</p>;
  }

  return (
    <div>
      <h3 className="font-bold text-text-primary text-lg mb-6">
        Bookings for {venueName}
      </h3>

      {/* Upcoming bookings */}
      <h4 className="font-semibold text-text-primary mb-3">
        Upcoming Bookings
      </h4>
      {upcoming.length === 0 ? (
        <p className="text-text-muted text-sm mb-6">No upcoming bookings.</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block mb-8 overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label={`Upcoming bookings for ${venueName}`}
            >
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="pb-3 font-semibold">Guest</th>
                  <th className="pb-3 font-semibold">Check in</th>
                  <th className="pb-3 font-semibold">Check out</th>
                  <th className="pb-3 font-semibold">Guests</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((booking) => (
                  <tr key={booking.id} className="border-b border-border">
                    <td className="py-3 text-text-primary">
                      {booking.customer?.name || "Guest"}
                    </td>
                    <td className="py-3 text-text-muted">
                      {formatDate(booking.dateFrom)}
                    </td>
                    <td className="py-3 text-text-muted">
                      {formatDate(booking.dateTo)}
                    </td>
                    <td className="py-3 text-text-muted">{booking.guests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile table*/}
          <div
            className="sm:hidden mb-8 space-y-0"
            aria-label={`Upcoming bookings for ${venueName}`}
          >
            {upcoming.map((booking) => (
              <div key={booking.id} className="border-b border-border py-3">
                <p className="text-text-primary text-sm font-semibold">
                  {booking.customer?.name || "Guest"}
                </p>
                <p className="text-text-muted text-sm">
                  {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                </p>
                <p className="text-text-muted text-sm">
                  {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Back button */}
      <Button variant="outline" size="sm" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

export default VenueBookings;
