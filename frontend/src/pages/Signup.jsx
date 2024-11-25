import React, { useState } from "react";
import axios from "axios";  // Use axios for API calls
import "./css/Signup.css"; // Import the custom CSS for styling the background
import backgroundImage from "../assets/img/signup-background.jpg"; // Import your background image

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/accounts/register/", formData);  // Ensure the correct endpoint
      alert("Sign Up Successful! Please log in.");
    } catch (error) {
      console.error("Sign Up failed", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="overlay">
        <div className="signup-form-container">
          <h2 className="text-3xl font-bold mb-6 text-white">Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="input mb-4 w-full"
            />
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
            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
