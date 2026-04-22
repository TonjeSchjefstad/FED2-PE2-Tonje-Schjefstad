import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import ButtonLink from "../ui/ButtonLink";
import Button from "../ui/Button";

/**
 * Header component displayed at the top of every page.
 * Contains the Holidaze logo, navigation links, and auth buttons.
 * Mobile: hamburger menu with slide-out panel from the right.
 * Desktop: horizontal navigation bar.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-30 md:px-6 md:py-3 border-b border-border md:border-none">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between bg-bg-primary md:bg-bg-primary/70 md:backdrop-blur-md md:rounded-full md:border md:border-border md:px-6 md:py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Holidaze logo" className="w-8 h-7" />
            <span className="font-logo text-xl text-text-primary">
              Holidaze
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-text-primary"
                  : "text-text-primary hover:text-brand-primary transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/venues"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-text-primary"
                  : "text-text-primary hover:text-brand-primary transition-colors"
              }
            >
              Venues
            </NavLink>
            <NavLink
              to="/"
              className="text-text-primary hover:text-brand-primary transition-colors"
            >
              Support
            </NavLink>
            <NavLink
              to="/"
              className="text-text-primary hover:text-brand-primary transition-colors"
            >
              About
            </NavLink>
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-text-primary font-semibold hover:text-brand-primary transition-colors"
                >
                  My Profile
                </Link>
                <Button variant="outline" size="md" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <ButtonLink to="/register" variant="outline" size="md">
                  Register
                </ButtonLink>
                <ButtonLink to="/login" variant="primary" size="md">
                  Sign In
                </ButtonLink>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-bg-primary z-50 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logo} alt="Holidaze logo" className="w-8 h-8" />
            <span className="font-logo text-xl text-text-primary">
              Holidaze
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="text-text-primary"
          >
            <X size={24} />
          </button>
        </div>
        {/* Logged in - Welcome message */}
        {isLoggedIn && user && (
          <div className="px-6 py-6 border-b border-border ">
            <h2 className="text-xl font-bold text-text-primary">
              Welcome {user.name}
            </h2>
            <p className="text-text-muted text-sm mt-1">
              Ready to book your next adventure?
            </p>
            <div className="mt-6">
              <ButtonLink
                to="/profile"
                variant="outline"
                size="md"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </ButtonLink>
            </div>
          </div>
        )}

        <nav className="flex flex-col px-6 py-2">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `py-4 border-b border-border ${isActive ? "font-semibold text-text-primary" : "text-text-primary hover:text-brand-primary transition-colors"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/venues"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `py-4 border-b border-border ${isActive ? "font-semibold text-text-primary" : "text-text-primary hover:text-brand-primary transition-colors"}`
            }
          >
            Venues
          </NavLink>
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="py-4 border-b border-border text-text-primary hover:text-brand-primary transition-colors"
          >
            Support
          </NavLink>
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="py-4 text-text-primary hover:text-brand-primary transition-colors"
          >
            About
          </NavLink>
        </nav>

        <div className="flex flex-col px-6 gap-4 mt-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                {" "}
                Logout{" "}
              </Button>
            </>
          ) : (
            <>
              <ButtonLink
                to="/login"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </ButtonLink>
              <ButtonLink
                to="/register"
                variant="outline"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
