import axios from "axios";

// Function to get the CSRF token from cookies
const getCsrfToken = () => {
  const cookies = document.cookie.split("; "); // Split cookies into an array
  for (let cookie of cookies) {
    const [name, value] = cookie.split("="); // Split each cookie into name and value
    if (name === "csrftoken") { // Look for the "csrftoken" cookie
      return value; // Return the CSRF token value
    }
  }
  return null; // Return null if no CSRF token is found
};

// Create an Axios instance with base configuration
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Update to match your Django API base URL
  withCredentials: true, // Ensures cookies (like session and CSRF tokens) are sent with requests
});

// Interceptor to add the CSRF token to every request
API.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken(); // Fetch CSRF token from cookies
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken; // Add CSRF token header
    console.log("CSRF Token included in request headers:", csrfToken); // Debug log
  } else {
    console.warn("CSRF Token not found. Requests might fail."); // Debug warning
  }
  return config; // Return the modified config
}, (error) => {
  // Handle request errors
  console.error("Error in request interceptor:", error);
  return Promise.reject(error);
});

export default API;
