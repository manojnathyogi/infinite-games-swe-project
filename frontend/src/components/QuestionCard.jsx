import React from 'react';

const QuestionCard = ({ question, options, handleAnswer }) => {
  return (
    <div className="card shadow-md mt-8">
      <div className="card-body">
        <h2 className="text-lg font-bold">{question}</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {options.map((option, index) => (
            <button
              key={index}
              className="btn btn-outline btn-primary"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
