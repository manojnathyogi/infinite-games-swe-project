import React from "react";
import { Link } from "react-router-dom";
import "./css/Dashboard.css";
import quizImage from "../assets/img/quiz1.jpg"; // Example image for Quiz
import cahImage from "../assets/img/cah.jpg"; // Example image for Cards Against Humanity

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="welcome-header">Welcome, User</h1>
      <div className="game-grid">
        <div className="game-card">
          <img src={quizImage} alt="Quiz Game" className="game-image" />
          <div className="game-info">
            <h2 className="game-title">Quiz Game</h2>
            <Link to="/quiz" className="btn btn-primary">
              Play Now
            </Link>
          </div>
        </div>
        <div className="game-card">
          <img src={cahImage} alt="Cards Against Humanity" className="game-image" />
          <div className="game-info">
            <h2 className="game-title">Cards Against Humanity</h2>
            <Link to="/games/cards-against-humanity" className="btn btn-secondary">
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../utils/api";
// import "./css/Dashboard.css";
// import defaultQuizImage from "../assets/img/quiz1.jpg"; // Import the default image

// const Dashboard = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch quizzes on mount
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await API.get("/quiz/");
//         setQuizzes(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <h1 className="welcome-header">Welcome, User</h1>
//       <div className="quiz-grid">
//         {quizzes.map((quiz) => (
//           <div key={quiz.id} className="quiz-card">
//             <img
//               src={quiz.imageUrl || defaultQuizImage}
//               alt={quiz.title}
//               className="quiz-image"
//             />
//             <div className="quiz-info">
//               <h2 className="quiz-title">{quiz.title}</h2>
//               <p className="quiz-description">{quiz.description}</p>
//               <Link to={`/quiz/${quiz.id}`} className="play-button">
//                 Play Now
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <div className="create-quiz-button-container">
//         <Link to="/quiz/create" className="create-quiz-button">
//           Create New Quiz
//         </Link>
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard;
