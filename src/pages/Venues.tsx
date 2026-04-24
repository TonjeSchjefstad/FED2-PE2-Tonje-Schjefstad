import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VenueCard from "../components/venue/VenueCard";
import { getVenues, searchVenues } from "../services/api";
import type { Venue } from "../types/venue";
import Pagination from "../components/ui/Pagination";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SearchBar from "../components/venue/SearchBar";

{
  /*Venues displayed per page */
}
const VENUES_PER_PAGE = 12;

/**
 * Venues page displaying a grid of all available venues.
 * Fetches venue data from the API and handles loading, error, and empty states.
 * Includes a search bar that allows users to search for venues by destination, which updates the URL query parameters and triggers a new API fetch.
 * Implements pagination to show a limited number of venues per page.
 * Each venue is displayed using the VenueCard component.
 */
function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
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

  const totalPages = Math.ceil(venues.length / VENUES_PER_PAGE);
  const paginatedVenues = venues.slice(
    (currentPage - 1) * VENUES_PER_PAGE,
    currentPage * VENUES_PER_PAGE
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
