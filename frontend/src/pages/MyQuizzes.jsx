import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import "./css/MyQuizzes.css"; // Import custom CSS

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await API.get("/quiz");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await API.delete(`/quiz/${quizId}/`);
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      } catch (error) {
        console.error("Failed to delete quiz", error);
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto mt-8">Loading quizzes...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-6 text-center">My Quizzes</h1>
      <div className="text-center mb-6">
        <Link to="/quiz/create" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition">
          Create New Quiz
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-semibold mb-2">{quiz.title}</h2>
                <p className="text-gray-600 mb-4">{quiz.description || "No description available"}</p>
                <div className="flex justify-start space-x-3 mt-4">
                  <Link to={`/quiz/edit/${quiz.id}`} className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-gray-700 text-lg mb-4">You haven't created any quizzes yet. Click Create New Quiz to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuizzes;
