import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

/**
 * Reusable button component with support for different variants, sizes, and loading state.
 */
function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-button-primary text-white hover:bg-button-hover disabled:bg-button-disabled",
    outline:
      "border border-button-primary text-button-primary hover:bg-button-primary hover:text-white disabled:border-button-disabled disabled:text-button-disabled",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base w-full",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

export default Button;
