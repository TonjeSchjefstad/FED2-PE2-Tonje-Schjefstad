interface SortingProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Sorting dropdown component for the venues page.
 * Allows users to sort venues by recommendation, price, or newest venues.
 */
function Sorting({ value, onChange }: SortingProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-border rounded-lg px-4 py-2 pr-10 text-sm text-text-primary outline-none focus:border-brand-primary accent-button-primary cursor-pointer "
      >
        <option value="recommended">Recommended</option>
        <option value="price_high">High to low</option>
        <option value="price_low">Low to high</option>
        <option value="newest">Newest</option>
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
        ▾
      </span>
    </div>
  );
}

export default Sorting;
