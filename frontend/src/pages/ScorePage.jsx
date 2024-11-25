import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScorePage = () => {
  const { state } = useLocation();
  const { answers, questions } = state || {};
  const navigate = useNavigate();

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Score</h1>
        <div className="card shadow-md p-8 mx-auto max-w-md">
          <p className="text-lg mb-4">No questions available.</p>
          <button className="btn btn-primary w-full" onClick={() => navigate("/quiz")}>Close</button>
        </div>
      </div>
    );
  }

  const correctAnswers = questions.filter((question, index) =>
    question.answers.some((answer) => answer.id === answers[index] && answer.is_right)
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Score</h1>
      <div className="card shadow-md p-8 mx-auto max-w-md">
        {questions[0] && questions[0].quiz && (
          <h2 className="text-xl font-semibold mb-4">{questions[0].quiz.title}</h2>
        )}
        <p className="text-lg mb-2">Total Answers: {questions.length}</p>
        <p className="text-lg mb-2">Correct Answers: {correctAnswers.length}</p>
        <p className="text-lg mb-4">Correct Percentage: {((correctAnswers.length / questions.length) * 100).toFixed(2)}%</p>
        <button className="btn btn-primary w-full" onClick={() => navigate("/quiz")}>Close</button>
      </div>
    </div>
  );
};

export default ScorePage;

// Old Working Code

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const ScorePage = () => {
//   const { state } = useLocation();
//   const { answers, questions } = state || {};
//   const navigate = useNavigate();

//   const correctAnswers = questions.filter((question, index) =>
//   question.answers.some((answer) => answer.id === answers[index] && answer.is_right)
// );

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Score</h1>
//       <div className="card shadow-md p-8 mx-auto max-w-md">
//         <h2 className="text-xl font-semibold mb-4">{questions[0].quiz.title}</h2>
//         <p className="text-lg mb-2">Total Answers: {questions.length}</p>
//         <p className="text-lg mb-2">Correct Answers: {correctAnswers.length}</p>
//         <p className="text-lg mb-4">Correct Percentage: {((correctAnswers.length / questions.length) * 100).toFixed(2)}%</p>
//         <button className="btn btn-primary w-full" onClick={() => navigate("/quiz")}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default ScorePage;
