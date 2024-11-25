import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { title: "", answers: ["", "", "", ""], correctAnswerIndex: null },
    ]);
  };

  const handleSaveQuiz = async () => {
    try {
      const formattedQuestions = questions.map((question) => ({
        title: question.title,
        answers: question.answers.map((answer, index) => ({
          answer_text: answer,
          is_right: question.correctAnswerIndex === index,
        })),
      }));

      const payload = {
        title: quizTitle,
        questions: formattedQuestions,
      };

      const response = await API.post("/quiz/", payload);

      if (response.status === 201) {
        navigate(`/quiz/me`);
      } else {
        console.error("Failed to create quiz:", response);
      }
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
      <div className="card shadow-md">
        <div className="card-body">
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <button className="btn btn-primary mb-4" onClick={addQuestion}>
            Add Question
          </button>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Question Title"
                value={question.title}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].title = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="input input-bordered w-full mb-2"
              />
              <div className="grid grid-cols-2 gap-2">
                {question.answers.map((answer, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Answer ${idx + 1}`}
                      value={answer}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].answers[idx] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      className="input input-bordered w-full"
                    />
                    <input
                      type="radio"
                      name={`correctAnswer-${index}`}
                      checked={question.correctAnswerIndex === idx}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[index].correctAnswerIndex = idx;
                        setQuestions(newQuestions);
                      }}
                    />
                    <label>Correct</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-primary mt-4" onClick={handleSaveQuiz}>
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;


// import React, { useState } from "react";
// import API from "../utils/api";
// import { useNavigate } from "react-router-dom";

// const CreateQuiz = () => {
//   const [quizTitle, setQuizTitle] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { title: "", answers: ["", "", "", ""], correctAnswerIndex: null },
//     ]);
//   };

//   const handleSaveQuiz = async () => {
//     try {
//       const formattedQuestions = questions.map((question) => ({
//         title: question.title,
//         answers: question.answers.map((answer, index) => ({
//           answer_text: answer,
//           is_right: question.correctAnswerIndex === index,
//         })),
//       }));

//       await API.post("/quiz/", {
//         title: quizTitle,
//         questions: formattedQuestions,
//       });
//       navigate(`/quiz/me`);
//     } catch (error) {
//       console.error("Failed to create quiz", error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
//       <div className="card shadow-md">
//         <div className="card-body">
//           <input
//             type="text"
//             placeholder="Quiz Title"
//             value={quizTitle}
//             onChange={(e) => setQuizTitle(e.target.value)}
//             className="input input-bordered w-full mb-4"
//           />
//           <button className="btn btn-primary mb-4" onClick={addQuestion}>
//             Add Question
//           </button>
//           {questions.map((question, index) => (
//             <div key={index} className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Question Title"
//                 value={question.title}
//                 onChange={(e) => {
//                   const newQuestions = [...questions];
//                   newQuestions[index].title = e.target.value;
//                   setQuestions(newQuestions);
//                 }}
//                 className="input input-bordered w-full mb-2"
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 {question.answers.map((answer, idx) => (
//                   <div key={idx} className="flex items-center space-x-2">
//                     <input
//                       type="text"
//                       placeholder={`Answer ${idx + 1}`}
//                       value={answer}
//                       onChange={(e) => {
//                         const newQuestions = [...questions];
//                         newQuestions[index].answers[idx] = e.target.value;
//                         setQuestions(newQuestions);
//                       }}
//                       className="input input-bordered w-full"
//                     />
//                     <input
//                       type="radio"
//                       name={`correctAnswer-${index}`}
//                       checked={question.correctAnswerIndex === idx}
//                       onChange={() => {
//                         const newQuestions = [...questions];
//                         newQuestions[index].correctAnswerIndex = idx;
//                         setQuestions(newQuestions);
//                       }}
//                     />
//                     <label>Correct</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//           <button className="btn btn-primary mt-4" onClick={handleSaveQuiz}>
//             Save Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;

// import React, { useState } from "react";
// import API from "../utils/api";
// import { useNavigate } from "react-router-dom";

// const CreateQuiz = () => {
//   const [quizTitle, setQuizTitle] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();

//   const addQuestion = () => {
//     setQuestions([...questions, { title: "", answers: [], correctAnswer: "" }]);
//   };

//   const handleSaveQuiz = async () => {
//     try {
//       const response = await API.post("/quiz/", {
//         title: quizTitle,
//         questions,
//       });
//       navigate(`/quiz/me`);
//     } catch (error) {
//       console.error("Failed to create quiz", error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
//       <div className="card shadow-md">
//         <div className="card-body">
//           <input
//             type="text"
//             placeholder="Quiz Title"
//             value={quizTitle}
//             onChange={(e) => setQuizTitle(e.target.value)}
//             className="input input-bordered w-full mb-4"
//           />
//           <button className="btn btn-primary mb-4" onClick={addQuestion}>
//             Add Question
//           </button>
//           {questions.map((question, index) => (
//             <div key={index} className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Question Title"
//                 value={question.title}
//                 onChange={(e) => {
//                   const newQuestions = [...questions];
//                   newQuestions[index].title = e.target.value;
//                   setQuestions(newQuestions);
//                 }}
//                 className="input input-bordered w-full mb-2"
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 {[...Array(4)].map((_, idx) => (
//                   <input
//                     key={idx}
//                     type="text"
//                     placeholder={`Answer ${idx + 1}`}
//                     value={question.answers[idx] || ""}
//                     onChange={(e) => {
//                       const newQuestions = [...questions];
//                       newQuestions[index].answers[idx] = e.target.value;
//                       setQuestions(newQuestions);
//                     }}
//                     className="input input-bordered w-full"
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//           <button className="btn btn-primary mt-4" onClick={handleSaveQuiz}>
//             Save Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;
