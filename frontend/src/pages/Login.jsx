import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css"; // Import the custom CSS for styling the background
import backgroundImage from "../assets/img/login-background.jpg"; // Import your background image

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch CSRF token
      await axios.get("http://127.0.0.1:8000/accounts/csrf/", {
        withCredentials: true,
      });

      // Submit login request
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Login successful!");
        window.location.href = "/dashboard/"; // Redirect on success
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Login failed. Please try again.");
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-form-container">
          <h2 className="text-3xl font-bold mb-6 text-white">Login</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="input mb-4 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="input mb-4 w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
