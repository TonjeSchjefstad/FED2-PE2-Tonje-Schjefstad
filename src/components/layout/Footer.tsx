import { Link } from "react-router-dom";
/**
 * Footer component displayed at the bottom of every page.
 * Contains support links, company info, contact, and social media links.
 */
function Footer() {
  return (
    <footer className="w-full bg-bg-footer text-text-secondary">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-sm mb-4">Support</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Safety information
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Cancellation options
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-4">Company</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Community Blog
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Terms of service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-4">Contact</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Get in touch
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-bg-muted transition-colors">
                Partnerships
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-4">Social</h3>
          <div className="flex gap-4">
            {/* Facebook */}
            <Link
              to="/"
              aria-label="Facebook"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            {/* Twitter/X */}
            <Link
              to="/"
              aria-label="Twitter"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            {/* TikTok */}
            <Link
              to="/"
              aria-label="TikTok"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
              </svg>
            </Link>
            {/* YouTube */}
            <Link
              to="/"
              aria-label="YouTube"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 7s-.3-1.9-1.1-2.7c-1-1.1-2.2-1.1-2.7-1.2C16.4 3 12 3 12 3s-4.4 0-7.2.1c-.5.1-1.7.1-2.7 1.2C1.3 5.1 1 7 1 7S.7 9.1.7 11.2v1.9c0 2.1.3 4.2.3 4.2s.3 1.9 1.1 2.7c1 1.1 2.4 1 3 1.1C7.2 21 12 21 12 21s4.4 0 7.2-.2c.5-.1 1.7-.1 2.7-1.2.8-.8 1.1-2.7 1.1-2.7s.3-2.1.3-4.2v-1.9C23.3 9.1 23 7 23 7zM9.7 15.5v-7.3l7.3 3.7-7.3 3.6z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <span>@2026 Holidaze. All rights reserved.</span>
        <div className="flex gap-2">
          {/* Visa */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="24"
            viewBox="0 0 38 24"
            role="img"
            aria-label="Visa"
          >
            <rect width="38" height="24" rx="4" fill="#1A1F71" />
            <text
              x="19"
              y="16"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              fontFamily="Arial"
            >
              VISA
            </text>
          </svg>
          {/* Mastercard */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="24"
            viewBox="0 0 38 24"
            role="img"
            aria-label="Mastercard"
          >
            <rect width="38" height="24" rx="4" fill="#252525" />
            <circle cx="15" cy="12" r="7" fill="#EB001B" />
            <circle cx="23" cy="12" r="7" fill="#F79E1B" />
            <path
              d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z"
              fill="#FF5F00"
            />
          </svg>
          {/* PayPal */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="24"
            viewBox="0 0 38 24"
            role="img"
            aria-label="PayPal"
          >
            <rect width="38" height="24" rx="4" fill="#003087" />
            <text
              x="19"
              y="16"
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontWeight="bold"
              fontFamily="Arial"
            >
              PayPal
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
