import bgHero from "../assets/bg-hero.webp";
import chooseUs from "../assets/choose-us.webp";

/**
 * Homepage with hero section, highly rated venues section, and why choose us section.
 */
function Home() {
  return (
    <div>
      {/* Hero section */}
      <section
        className="relative w-full h-150 bg-cover bg-center flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg pb-6">
            Find Your Perfect Stay, Anywhere
          </h1>
          <p className="text-white/80 text-sm mb-12">
            Discover handpicked accommodations designed for comfort, style, and
            unforgettable experiences. Whether you're planning a weekend escape
            or a long-term getaway, Holidaze makes it easy to book the stay that
            feels just right.
          </p>

          {/* Search bar placeholder */}
          <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Where are you going?"
              className="flex-1 px-4 py-2 rounded-lg border border-border text-text-primary outline-none"
            />
            <button className="bg-button-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-button-hover transition-colors cursor-pointer">
              Search Venues →
            </button>
          </div>
        </div>
      </section>

      {/* Highly Rated Hideaways section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-2">
          Highly Rated Hideaways
        </h2>
        <p className="text-text-muted mb-8">
          Explore accommodations that travelers consistently rate highly for
          comfort, cleanliness, and location. Carefully selected based on guest
          reviews, these stays offer reliable quality and a welcoming atmosphere
          you can count on.
        </p>

        {/* Venue grid will be added here */}
      </section>

      {/* Why Choose Us section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={chooseUs}
              alt="Beautiful landscape"
              className="rounded-xl w-full h-72 md:h-104 object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-brand-primary">
              Why <span className="text-text-primary">Choose Us</span>
            </h2>
            <p className="text-text-muted mb-6">
              We make finding the perfect stay simple, secure, and stress-free.
              Whether you're planning a weekend getaway or a longer adventure,
              we connect you with accommodations you can trust.
            </p>
            <ul className="space-y-3 text-text-primary mb-6 font-semibold">
              <li className="flex items-center gap-2">
                <span className="text-brand-primary">◆</span>
                Carefully selected accommodations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-primary">◆</span>
                Real reviews from real guests
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-primary">◆</span>
                Clear prices. No hidden fees.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-primary">◆</span>
                Friendly support when you need it.
              </li>
            </ul>
            <p className="text-text-muted">
              We believe travel should be exciting, not complicated. That's why
              we focus on transparency, reliability, and exceptional service, so
              you can focus on enjoying your trip.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
