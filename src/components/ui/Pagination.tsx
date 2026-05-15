import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component for navigating between pages.
 * Shows first 3 pages with ellipsis and arrow navigation for larger page counts.
 * Scrolls to top of page when navigating.
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonClass = (active: boolean) =>
    `w-10 h-10 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
      active
        ? "bg-button-primary text-white"
        : "border border-button-primary text-text-primary hover:bg-bg-secondary"
    }`;

  const visiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3];
    }
    if (currentPage >= totalPages - 2) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer border border-button-primary ${
          currentPage === 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-bg-secondary text-text-primary"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* First page + ellipsis */}
      {currentPage > 3 && totalPages > 3 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={buttonClass(false)}
          >
            1
          </button>
          <span className="text-text-muted">...</span>
        </>
      )}

      {/* Visible pages */}
      {visiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={buttonClass(page === currentPage)}
        >
          {page}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {currentPage < totalPages - 2 && totalPages > 3 && (
        <>
          <span className="text-text-muted">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={buttonClass(false)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer border border-button-primary ${
          currentPage === totalPages
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-bg-secondary text-text-primary"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
