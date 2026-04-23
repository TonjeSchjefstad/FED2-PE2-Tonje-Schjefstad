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
