import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provide context to the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate loading user data from localStorage or an API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Mock login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Mock logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for consuming context
export function useAuth() {
  return useContext(AuthContext);
}
