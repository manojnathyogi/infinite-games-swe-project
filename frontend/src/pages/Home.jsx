import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css"; // Import the custom CSS for styling the background
import backgroundImage from "../assets/img/quiz-background.jpg"; // Import your background image

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Social Circle</h1>
        <p className="mb-4 text-white">Start your quiz journey today!</p>
        <div className="space-x-4">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
