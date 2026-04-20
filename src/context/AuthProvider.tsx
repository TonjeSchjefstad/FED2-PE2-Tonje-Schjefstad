import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";

/**
 * AuthProvider component that wraps the app and provides auth state.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (user: NonNullable<AuthContextType["user"]>, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoggedIn: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
