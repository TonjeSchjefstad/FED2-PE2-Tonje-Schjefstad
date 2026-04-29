import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import { createApiKey } from "../services/api";

interface User {
  name: string;
  email: string;
  venueManager: boolean;
}

/**
 * AuthProvider component that wraps the app and provides auth state.
 * Manages user, token, and API key in state and localStorage.
 * Provides login and logout functions to update state and localStorage.
 * On login, also creates an API key and stores it.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [token, setToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const login = async (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    const key = await createApiKey(token);
    setApiKey(key);
    localStorage.setItem("apiKey", key);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setApiKey(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("apiKey");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, apiKey, login, logout, isLoggedIn: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
