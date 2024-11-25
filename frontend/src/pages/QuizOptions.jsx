import React from "react";
import { useParams, Link } from "react-router-dom";
import "./css/QuizOptions.css"; // Import custom CSS for better styling

const QuizOptions = () => {
  const { quizId } = useParams();

  return (
    <div className="quiz-options-container">
      <div className="card quiz-options-card shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Quiz Options</h1>
        <div className="button-group">
          <Link to={`/quiz/play/${quizId}`} className="option-button btn-primary">
            Play Online
          </Link>
          <Link to={`/quiz-offline`} className="option-button btn-secondary">
            Play Offline
          </Link>
          <Link to={`/quiz/me`} className="option-button btn-accent">
            My Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizOptions;
