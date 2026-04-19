import { Link } from "react-router-dom";

/**
 * 404 Not Found page component. Displays a message when the user navigates to a route that does not exist, and a link to return to the home page.
 */

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-8xl md:text-9xl font-bold text-brand-primary leading-none">
        404
      </h1>
      <h2 className="text-2xl font-bold text-text-primary mt-4 mb-2">
        Page Not Found
      </h2>
      <p className="text-text-primary mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved, deleted, or the URL may be incorrect.
      </p>
      <Link
        to="/"
        className="bg-button-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-button-hover transition-colors cursor-pointer"
      >
        Get me out of here
      </Link>
    </div>
  );
}

export default NotFound;
