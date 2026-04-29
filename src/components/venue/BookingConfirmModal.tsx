import Button from "../ui/Button";

interface BookingConfirmModalProps {
  dateFrom: string;
  dateTo: string;
  guests: number;
  price: number;
  nights: number;
  totalPrice: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

/**
 * BookingConfirm displays a summary of the booking before confirmation.
 * Shows dates, guests, price breakdown and total.
 * Calls onConfirm when user clicks Book Now, onCancel when user clicks Cancel.
 */
function BookingConfirmModal({
  dateFrom,
  dateTo,
  guests,
  price,
  nights,
  totalPrice,
  onConfirm,
  onCancel,
  isLoading,
}: BookingConfirmModalProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl p-12 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-text-primary my-4">
          Confirm your booking
        </h2>
        <p className="text-text-muted text-sm mb-6">
          Review your details before completing your reservation.
        </p>

        {/* Booking summary */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-semibold text-text-primary">Dates</p>
            <p className="text-text-muted text-sm">
              {formatDate(dateFrom)} - {formatDate(dateTo)}
            </p>
          </div>
          <hr className="border-border" />
          <div>
            <p className="font-semibold text-text-primary">Guests</p>
            <p className="text-text-muted text-sm">{guests} guests</p>
          </div>
          <hr className="border-border" />
          <div>
            <p className="font-semibold text-text-primary">Price</p>
            <p className="text-text-muted text-sm">
              ${price} × {nights} nights
            </p>
            <p className="font-bold text-text-primary mt-4">
              Total: ${totalPrice}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmModal;
