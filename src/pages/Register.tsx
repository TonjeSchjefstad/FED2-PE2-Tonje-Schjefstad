import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";
import { registerUser, loginUser } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import bgHero from "../assets/bg-hero.webp";
import Button from "../components/ui/Button";

/**
 * Register page for creating a new Customer or Venue Manager account.
 * Uses React Hook Form and Zod for form validation.
 */
function Register() {
  const [accountType, setAccountType] = useState<"customer" | "venueManager">(
    "customer"
  );
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        venueManager: accountType === "venueManager",
      });

      const result = await loginUser({
        email: data.email,
        password: data.password,
      });

      login(result, result.accessToken);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-[70vh] md:min-h-[80vh] bg-cover bg-center flex items-center justify-center px-4 md:-mt-22.5"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 md:px-16 py-16 w-full max-w-lg shadow-lg">
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          Create account
        </h1>

        {/* Account type toggle */}
        <p className="text-sm text-text-primary mb-2">Select account type:</p>
        <div className="flex rounded-lg overflow-hidden border border-border mb-4">
          <button
            type="button"
            onClick={() => setAccountType("customer")}
            className={`flex-1 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              accountType === "customer"
                ? "bg-button-primary text-white"
                : "bg-white text-text-primary hover:bg-bg-secondary"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setAccountType("venueManager")}
            className={`flex-1 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              accountType === "venueManager"
                ? "bg-button-primary text-white"
                : "bg-white text-text-primary hover:bg-bg-secondary"
            }`}
          >
            Venue Manager
          </button>
        </div>

        {/* Account type description */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-text-primary mb-1">
            {accountType === "customer"
              ? "Customer account"
              : "Venue Manager account"}
          </p>
          <p className="text-sm text-text-muted">
            {accountType === "customer"
              ? "A customer account is used for booking venues whenever you want. For adding and managing your own venues, switch to Venue Manager."
              : "A venue manager account is used for adding and managing your own venues. If you only want to book venues, switch to Customer account."}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-error text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-text-primary mb-1 block">Name</label>
            <input
              {...register("name")}
              placeholder="Your name"
              className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-text-primary mb-1 block">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="example@stud.noroff.no"
              className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white"
            />
            {errors.email && (
              <p className="text-error text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-text-primary mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password"
                className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-text-primary mb-1 block">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password"
                className="w-full border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-primary bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-error text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit button*/}
          <Button type="submit" size="lg" isLoading={isSubmitting}>
            Create Account
          </Button>
        </form>

        <p className="text-sm text-text-muted text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-primary font-semibold hover:underline"
          >
            Sign in here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
