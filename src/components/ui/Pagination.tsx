interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component for navigating between pages.
 * Displays page numbers and highlights the current page.
 * Calls onPageChange when a page is clicked.
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            page === currentPage
              ? "bg-button-primary text-white"
              : "border border-button-primary text-text-primary hover:bg-bg-secondary"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
