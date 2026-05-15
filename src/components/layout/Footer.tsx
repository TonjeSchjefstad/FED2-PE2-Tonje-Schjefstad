import { Link } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";
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
          <ul className="space-y-3 text-sm">
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
          <ul className="space-y-3 text-sm">
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
          <ul className="space-y-3 text-sm">
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
            <Link
              to="/"
              aria-label="Facebook"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <FaFacebook size={14} />
            </Link>
            <Link
              to="/"
              aria-label="Twitter"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <FaXTwitter size={14} />
            </Link>
            <Link
              to="/"
              aria-label="TikTok"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <FaTiktok size={14} />
            </Link>
            <Link
              to="/"
              aria-label="YouTube"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-text-secondary hover:bg-brand-primary transition-colors"
            >
              <FaYoutube size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-border flex flex-row items-center justify-between gap-4 text-sm">
        <span>@2026 Holidaze. All rights reserved.</span>
        <div className="flex gap-2 items-center">
          <FaCcVisa size={35} className="text-text-secondary" />
          <FaCcMastercard size={35} className="text-text-secondary" />
          <FaCcPaypal size={35} className="text-text-secondary" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
