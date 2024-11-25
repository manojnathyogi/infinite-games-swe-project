import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/Login.css"; // Import the CSS file

const Login = () => {
  const { setIsAuthenticated, setUsername } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await API.post("/accounts/login/", formData); // Use API instance
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUsername(response.data.username);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-form-container">
          <h2 className="text-3xl font-bold mb-6 text-white">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input mb-4 w-full"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="password"
              className="input mb-4 w-full"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button type="submit" className="btn w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
