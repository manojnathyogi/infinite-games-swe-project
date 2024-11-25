import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";
import "./css/QuizOfflineSelect.css";

const QuizOfflineSelect = () => {
  const { quizId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await API.get("/quiz/all-quizzes/");
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="quiz-offline-container">
      <div className="card quiz-offline-card shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Select Quiz to Play Offline</h1>
        <div className="dropdown-container mb-6">
          <select value={selectedQuiz} onChange={handleSelectChange} className="dropdown input-bordered w-full">
            <option value="" disabled>Select a Quiz</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <Link
            to={`/quiz/play/${selectedQuiz}`}
            className={`btn btn-primary start-button ${!selectedQuiz ? "disabled" : ""}`}
            disabled={!selectedQuiz}
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizOfflineSelect;
