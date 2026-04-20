import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

/**
 * Header component displayed at the top of every page.
 * Contains the Holidaze logo, navigation links, and auth buttons.
 * Mobile: hamburger menu with slide-out panel from the right.
 * Desktop: horizontal navigation bar.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur-md bg-bg-primary/70 border-b border-border md:border-none">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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
                <button
                  onClick={logout}
                  className="border border-button-primary text-button-primary px-5 py-2 rounded-lg font-semibold hover:bg-bg-secondary transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-text-primary font-semibold hover:text-brand-primary transition-colors cursor-pointer"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-button-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-button-hover transition-colors cursor-pointer"
                >
                  Sign In
                </Link>
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
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-button-primary text-white py-3 rounded-lg font-semibold hover:bg-button-hover transition-colors text-center"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full border border-button-primary text-button-primary py-3 rounded-lg font-semibold hover:bg-bg-secondary transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-button-primary text-white py-3 rounded-lg font-semibold hover:bg-button-hover transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full border border-button-primary text-button-primary py-3 rounded-lg font-semibold hover:bg-bg-secondary transition-colors text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
