import ButtonLink from "../components/ui/ButtonLink";

/**
 * About page displaying information about Holidaze.
 */
function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          About <span className="text-button-active">Holidaze</span>
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
          We believe travel should be simple, honest, and unforgettable.
          Holidaze connects travelers with quality accommodations they can
          trust.
        </p>
      </div>

      <img
        src="https://images.unsplash.com/photo-1475087542963-13ab5e611954?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Sunrise over a beautiful landscape, symbolizing new adventures"
        className="rounded-xl w-full h-80 object-cover mb-16"
      />

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Our Story</h2>
        <p className="text-text-muted leading-relaxed mb-4">
          Holidaze started as a simple idea between two friends who were tired
          of complicated booking experiences and hidden fees. After one too many
          disappointing stays, they decided to build something better — a
          platform where transparency and quality come first.
        </p>
        <p className="text-text-muted leading-relaxed mb-4">
          What began as a small project quickly grew into a community of
          travelers and venue managers who shared the same vision: that finding
          a great place to stay should be enjoyable, not stressful.
        </p>
        <p className="text-text-muted leading-relaxed">
          Today, Holidaze is home to hundreds of carefully selected venues
          across the world. From cozy mountain cabins to stylish city
          apartments, we have something for every type of traveler. And we're
          just getting started.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Ready to start your next adventure?
        </h2>
        <p className="text-text-muted">
          Find your perfect stay and make memories that last a lifetime.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <ButtonLink to="/venues">Browse Venues</ButtonLink>
        <ButtonLink to="/register" variant="outline">
          Create an Account
        </ButtonLink>
      </div>
    </div>
  );
}

export default About;
