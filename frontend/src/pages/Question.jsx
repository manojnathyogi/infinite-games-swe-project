// FILE: django-react-quiz-project/frontend/src/components/Question.jsx
import React from 'react';

const Question = ({ question, options, handleAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleAnswer(option)}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;