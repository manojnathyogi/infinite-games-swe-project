import axios from "axios";

// Function to get the CSRF token from cookies
const getCsrfToken = () => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "csrftoken") {
      return value;
    }
  }
  return null;
};

// Create an axios instance with base configuration
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Update to match your Django API base URL
  withCredentials: true, // Ensures cookies (like session and CSRF tokens) are sent with requests
});

// Interceptor to add the CSRF token to every request
API.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken; // Add CSRF token header
  }
  return config;
});

export default API;