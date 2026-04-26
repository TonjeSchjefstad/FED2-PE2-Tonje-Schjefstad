import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs component for Venue Detail Page.
 * The last item is displayed as the current page without a link.
 */
function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-sm text-text-muted mb-6"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight size={14} />}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-brand-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary font-semibold">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
