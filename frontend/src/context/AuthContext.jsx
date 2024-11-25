import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  // Function to check authentication status on page load
  const checkAuthStatus = async () => {
    try {
      const response = await API.get("/accounts/auth-status/"); // Call the backend to check auth
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        setUsername(response.data.username);
      } else {
        setIsAuthenticated(false);
        setUsername(null);
      }
    } catch (error) {
      console.error("Failed to check authentication status:", error);
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  // Run the check on app initialization
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
