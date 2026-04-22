import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bgHero from "../assets/bg-hero.webp";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { loginUser } from "../services/api";
import { useAuth } from "../hooks/useAuth";

/**
 * Login page for signing in to an existing account.
 * Uses React Hook Form and Zod for form validation.
 */
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
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
      className="min-h-[65vh] md:min-h-[75vh] bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 md:px-16 py-16 w-full max-w-lg shadow-lg">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Sign In</h1>

        {/* Error message */}
        {error && (
          <p className="text-error text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                autoComplete="current-password"
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

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-text-muted cursor-pointer">
              <input
                type="checkbox"
                className="accent-button-primary cursor-pointer"
              />
              Remember me
            </label>
            <Link
              to="/"
              className="text-text-muted hover:text-brand-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit button*/}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-button-primary text-white py-3 rounded-lg font-semibold hover:bg-button-hover transition-colors cursor-pointer mt-2 disabled:bg-button-disabled disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-text-muted text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-brand-primary font-semibold hover:underline"
          >
            Register here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
