import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
  return (
    <div className="card shadow-md">
      <div className="card-body">
        <h2 className="card-title">{quiz.title}</h2>
        <p>{quiz.description || "No description available"}</p>
        <div className="card-actions justify-end">
          <Link to={`/quiz/play/${quiz.id}`} className="btn btn-primary">
            Play Now
          </Link>
          <Link to={`/quiz/edit/${quiz.id}`} className="btn btn-secondary">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
