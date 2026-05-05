const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Registers a new user. Returns user data and token on success.
 * Throws an error if registration fails.
 */
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  return json.data;
}

/**
 * Logs in a user and returns user data and token.
 */
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return json.data;
}

/**
 * Creates a new API key for the authenticated user.
 */
export async function createApiKey(token: string) {
  const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "Holidaze API Key" }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to create API key");
  }

  return json.data.key;
}

/**
 * Fetches all venues from the API. Returns an array of venues on success.
 * Throws an error if the request fails.
 */
export async function getVenues() {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues?limit=100&sort=rating&sortOrder=desc`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to fetch venues");
  }

  return json.data;
}

/**
 * Searches for venues by name or description.
 */
export async function searchVenues(query: string) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues/search?q=${encodeURIComponent(query)}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Search failed");
  }

  return json.data;
}

/**
 * Fetches a single venue by ID from the API.
 * Returns venue data including owner and bookings.
 */
export async function getVenue(id: string) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to fetch venue");
  }

  return json.data;
}

/**
 * Creates a new booking for a venue.
 * Requires authentication token.
 */
export async function createBooking(
  data: { dateFrom: string; dateTo: string; guests: number; venueId: string },
  token: string,
  apiKey: string
) {
  const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Booking failed");
  }

  return json.data;
}

/**
 * Fetches profile data for a given username. Requires authentication token and API key.
 * Returns profile data including avatar, banner, and counts of venues and bookings.
 */
export async function getProfile(name: string, token: string, apiKey: string) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/profiles/${name}?_venues=true&_bookings=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to fetch profile");
  }

  return json.data;
}
