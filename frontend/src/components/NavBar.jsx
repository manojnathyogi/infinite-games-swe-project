import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api"; // Import your Axios instance

const NavBar = () => {
  const { isAuthenticated, username, setIsAuthenticated, setUsername } =
    useAuth();

  const handleLogout = async () => {
    try {
      await API.post("/accounts/logout/"); // Use the configured Axios instance
      setIsAuthenticated(false); // Reset auth state
      setUsername(null);
      window.location.href = "/"; // Redirect to homepage
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="links flex space-x-4">
          {!isAuthenticated ? (
            <>
              <div className="logo">
                <Link to="/" className="text-xl font-bold">
                  InfiniteGame
                </Link>
              </div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/leaderboard">Leaderboard</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
        {isAuthenticated && (
          <div className="welcome">
            Welcome,{" "}
            <Link to="/profile">
              <span className="font-bold">{username}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
