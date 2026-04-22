import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

interface ButtonLinkProps extends LinkProps {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable ButtonLink component for navigation that supports different variants and sizes, styled like a button but behaves as a link.
 */
function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  const baseStyles = "font-semibold rounded-lg transition-colors text-center";

  const variants = {
    primary: "bg-button-primary text-white hover:bg-button-hover",
    outline:
      "border border-button-primary text-button-primary hover:bg-button-primary hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base w-full block",
  };

  return (
    <Link
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
