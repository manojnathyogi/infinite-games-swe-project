import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./css/PlayQuiz.css";

const PlayQuiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/quiz/questions/${quizId}/`);
        setQuestions(response.data);
        // Initialize answers with null values for each question
        setAnswers(new Array(response.data.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleAnswer = (index, answerId) => {
    const newAnswers = [...answers];
    newAnswers[index] = answerId;
    setAnswers(newAnswers);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    navigate(`/quiz/score/${quizId}`, { state: { answers, questions } });
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (questions.length === 0) {
    return <div className="no-questions-container">No questions available for this quiz.</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-title">Play Quiz</h2>
        <div className="progress">
          Question {currentIndex + 1} / {questions.length}
        </div>
      </div>
      <div className="question-card">
        <h3 className="question-title">{questions[currentIndex].title}</h3>
        <div className="options-grid">
          {questions[currentIndex].answers.map((option, index) => (
            <button
              key={index}
              className={`option-button ${answers[currentIndex] === option.id ? "selected" : ""}`}
              onClick={() => handleAnswer(currentIndex, option.id)}
            >
              {option.answer_text}
            </button>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            className="nav-button"
            onClick={handleNext}
            disabled={answers[currentIndex] === null}
          >
            Next
          </button>
        ) : (
          <button
            className="nav-button submit-button"
            onClick={handleSubmit}
            disabled={answers.includes(null)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;

// this block of code works

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../utils/api";

// const PlayQuiz = () => {
//   const { quizId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await API.get(`/quiz/questions/${quizId}/`);
//         console.log("Questions fetched:", response.data); // Debugging statement
//         setQuestions(response.data);
//         setLoading(false); // Set loading to false after questions are fetched
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setLoading(false); // Set loading to false even if there's an error
//       }
//     };

//     fetchQuestions();
//   }, [quizId]);

//   const handleAnswer = (answer) => {
//     setAnswers([...answers, answer]);
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       navigate(`/quiz/score/${quizId}`, { state: { answers, questions } });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (questions.length === 0) {
//     return <div>No questions available for this quiz.</div>;
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       {currentIndex < questions.length ? (
//         <div className="card shadow-md">
//           <div className="card-body">
//             <h2 className="text-xl font-bold">
//               {currentIndex + 1}: {questions[currentIndex].title}
//             </h2>
//             <div className="mt-4">
//               {questions[currentIndex].answers.map((option, index) => (
//                 <button
//                   key={index}
//                   className="btn btn-outline btn-block mb-2"
//                   onClick={() => handleAnswer(option.id)}
//                 >
//                   {option.answer_text}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>All questions answered!</div>
//       )}
//     </div>
//   );
// };

// export default PlayQuiz;
