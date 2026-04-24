import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, X } from "lucide-react";
import Button from "../ui/Button";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

/**
 * SearchBar component with destination and date fields.
 * Used on the homepage and venues page to allow users to search for venues.
 * Navigates to the venues page with the search query when the search button is clicked or Enter is pressed.
 * Clears the search query when the clear icon is clicked.
 */
function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/venues?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 w-full shadow-md md:divide-y-0 md:divide-x divide-border ">
      {/* Destinations field */}
      <div className="flex flex-col flex-1 px-4 py-2 md:py-0">
        <span className="text-xs font-semibold text-text-primary mb-1 text-left">
          Destinations
        </span>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Where Are You Going?"
            className="px-4 py-2 rounded-lg border border-border text-text-primary outline-none focus:border-brand-primary text-sm pr-8 w-full"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                if (onSearch) onSearch("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/*Date field */}
      <div className="flex flex-col flex-1 px-4 py-2 md:py-0">
        <span className="text-xs font-semibold text-text-primary mb-1 text-left">
          Check In - Check Out
        </span>
        <div className="relative">
          <input
            type="text"
            placeholder="Choose Dates"
            className="w-full px-4 py-2 rounded-lg border border-border text-text-muted outline-none text-sm pr-10"
          />
          <CalendarDays
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary"
          />
        </div>
      </div>

      {/* Search button */}
      <div className="flex items-end px-4 py-2 md:py-0">
        <Button
          onClick={handleSearch}
          className="whitespace-nowrap w-full md:w-auto px-12"
        >
          Search Venues →
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
