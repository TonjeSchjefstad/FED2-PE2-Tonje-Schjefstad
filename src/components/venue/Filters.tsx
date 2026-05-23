import Button from "../ui/Button";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  wifi: boolean;
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
  minRating: number;
  maxPrice: number;
  minGuests: number;
}

/**
 * Filters component for the venues page.
 * Allows users to filter venues by amenities, price range, number of guests and minimum rating.
 */
function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleChange = (key: keyof FilterState, value: boolean | number) => {
    const updated = { ...filters, [key]: value };
    onFilterChange(updated);
  };

  const handleClear = () => {
    onFilterChange({
      wifi: false,
      breakfast: false,
      parking: false,
      pets: false,
      minRating: 0,
      maxPrice: 10000,
      minGuests: 1,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Amenities */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 text-sm">
            Amenities
          </h3>
          <div className="flex flex-col gap-2">
            {(["wifi", "breakfast", "parking", "pets"] as const).map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={(e) => handleChange(key, e.target.checked)}
                  className="accent-button-primary cursor-pointer"
                />
                <span className="text-sm text-text-primary capitalize">
                  {key}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Number of guests */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 text-sm">
            Number of guests
          </h3>
          <div className="flex items-center gap-6 border border-border rounded-lg px-6 py-2 w-fit">
            <button
              type="button"
              aria-label="Decrease minimum guests"
              onClick={() =>
                handleChange("minGuests", Math.max(1, filters.minGuests - 1))
              }
              className="text-text-muted hover:text-brand-primary transition-colors cursor-pointer text-lg"
            >
              −
            </button>
            <span className="text-sm text-text-primary w-4 text-center">
              {filters.minGuests}
            </span>
            <button
              type="button"
              aria-label="Increase minimum guests"
              onClick={() => handleChange("minGuests", filters.minGuests + 1)}
              className="text-text-muted hover:text-brand-primary transition-colors cursor-pointer text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 text-sm">
            Minimum Rating
          </h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Set minimum rating to ${star}`}
                aria-pressed={star <= filters.minRating}
                onClick={() =>
                  handleChange(
                    "minRating",
                    star === filters.minRating ? 0 : star
                  )
                }
                className={`text-2xl cursor-pointer transition-colors ${star <= filters.minRating ? "text-brand-primary" : "text-border"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="md:col-span-2">
          <h3 className="font-semibold text-text-primary mb-3 text-sm">
            Price Range
            <span className="text-text-muted font-normal text-xs ml-2">
              Max ${filters.maxPrice}
            </span>
          </h3>
          <input
            type="range"
            aria-label="Maximum price"
            min={0}
            max={10000}
            step={100}
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
            className="w-full accent-button-primary cursor-pointer"
          />
        </div>
      </div>

      {/* Clear button */}
      <div className="flex justify-end mt-6">
        <Button variant="outline" type="button" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Filters;
