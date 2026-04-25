import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import VenueCard from "../components/venue/VenueCard";
import { getVenues, searchVenues } from "../services/api";
import type { Venue } from "../types/venue";
import Pagination from "../components/ui/Pagination";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SearchBar from "../components/venue/SearchBar";
import Sorting from "../components/venue/Sorting";
import Filters, { type FilterState } from "../components/venue/Filters";

/** Number of venues to display per page */
const VENUES_PER_PAGE = 12;

/**
 * Venues page displaying a grid of all available venues.
 * Fetches venue data from the API and handles loading, error, and empty states.
 * Includes a search bar that allows users to search for venues by destination, which updates the URL query parameters and triggers a new API fetch.
 * Provides sorting options (recommended, price high to low, price low to high, newest) and filtering options (wifi, breakfast, parking, pets, rating, price range, guest count).
 * Implements pagination to show a limited number of venues per page.
 * Each venue is displayed using the VenueCard component.
 */
function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState<FilterState>({
    wifi: false,
    breakfast: false,
    parking: false,
    pets: false,
    minRating: 0,
    maxPrice: 10000,
    minGuests: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const query = searchParams.get("q") || "";

  const handleSearch = (searchQuery: string) => {
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        setCurrentPage(1);
        const data = query ? await searchVenues(query) : await getVenues();
        setVenues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [query]);

  const sortedVenues = [...venues].sort((a, b) => {
    if (sortBy === "price_high") return b.price - a.price;
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "newest")
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    return 0;
  });

  const filteredVenues = sortedVenues.filter((venue) => {
    if (filters.wifi && !venue.meta.wifi) return false;
    if (filters.breakfast && !venue.meta.breakfast) return false;
    if (filters.parking && !venue.meta.parking) return false;
    if (filters.pets && !venue.meta.pets) return false;
    if (venue.price > filters.maxPrice) return false;
    if (venue.rating < filters.minRating) return false;
    if (filters.minGuests > 0 && venue.maxGuests < filters.minGuests)
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredVenues.length / VENUES_PER_PAGE);
  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * VENUES_PER_PAGE,
    currentPage * VENUES_PER_PAGE
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-text-muted">No venues found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Find your perfect venue
      </h1>

      {/* Search bar */}
      <SearchBar initialQuery={query} onSearch={handleSearch} />

      {/* Sort and results count */}
      <div className="flex justify-between items-center mt-6 mb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-border rounded-lg px-4 py-2 text-sm text-text-primary hover:border-brand-primary transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <p className="text-text-muted text-sm">
            {filteredVenues.length} venues found
          </p>
        </div>
        <Sorting value={sortBy} onChange={setSortBy} />
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6">
          <Filters onFilterChange={setFilters} />
        </div>
      )}

      {/* Venue grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Venues;
