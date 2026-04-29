import { useState } from "react";
import type { Booking } from "../../types/booking";
import Button from "../ui/Button";

interface AvailabilityCalendarProps {
  bookings: Booking[];
  onApply: (dateFrom: string, dateTo: string) => void;
  onClose: () => void;
}

/**
 * AvailabilityCalendar component displaying two months side by side.
 * Highlights already-booked dates and allows selection of date range.
 * Calls onApply with selected dates when user clicks Apply.
 */
function AvailabilityCalendar({
  bookings,
  onApply,
  onClose,
}: AvailabilityCalendarProps) {
  const today = new Date();
  const [selectedFrom, setSelectedFrom] = useState<Date | null>(null);
  const [selectedTo, setSelectedTo] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const bookedDates = bookings.flatMap((booking) => {
    const dates: string[] = [];
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    const current = new Date(start);
    while (current <= end) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  const isBooked = (date: Date) => {
    return bookedDates.includes(date.toISOString().split("T")[0]);
  };

  const isSelected = (date: Date) => {
    if (!selectedFrom) return false;
    if (selectedTo) {
      return date >= selectedFrom && date <= selectedTo;
    }
    return date.toDateString() === selectedFrom.toDateString();
  };

  const isPast = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const handleDayClick = (date: Date) => {
    if (isBooked(date) || isPast(date)) return;
    if (!selectedFrom || (selectedFrom && selectedTo)) {
      setSelectedFrom(date);
      setSelectedTo(null);
    } else {
      if (date < selectedFrom) {
        setSelectedFrom(date);
        setSelectedTo(null);
      } else {
        setSelectedTo(date);
      }
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderMonth = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const booked = isBooked(date);
      const selected = isSelected(date);
      const past = isPast(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDayClick(date)}
          disabled={booked || past}
          className={`text-xs p-1 rounded text-center transition-colors cursor-pointer ${
            selected
              ? "bg-button-primary text-white"
              : booked
                ? "bg-bg-muted text-text-disabled cursor-not-allowed"
                : past
                  ? "text-text-disabled cursor-not-allowed"
                  : "hover:bg-bg-secondary text-text-primary"
          }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="flex-1">
        <h3 className="text-center text-sm font-semibold text-text-primary mb-3">
          {monthNames[month].toUpperCase()} {year}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="text-xs text-text-muted text-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const handleApply = () => {
    if (selectedFrom && selectedTo) {
      const formatLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      onApply(formatLocal(selectedFrom), formatLocal(selectedTo));
      onClose();
    }
  };

  const handleClear = () => {
    setSelectedFrom(null);
    setSelectedTo(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 2 months side by side */}
        <div className="flex gap-8 mb-6">
          {renderMonth(viewMonth, viewYear)}
          {renderMonth(nextMonth, nextYear)}
        </div>

        {/* Navigation and buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              if (viewMonth === 0) {
                setViewMonth(11);
                setViewYear(viewYear - 1);
              } else {
                setViewMonth(viewMonth - 1);
              }
            }}
            className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            ‹
          </button>

          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={handleClear}>
              Clear
            </Button>
            <Button
              type="button"
              disabled={!selectedFrom || !selectedTo}
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (viewMonth === 11) {
                setViewMonth(0);
                setViewYear(viewYear + 1);
              } else {
                setViewMonth(viewMonth + 1);
              }
            }}
            className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer"
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityCalendar;
