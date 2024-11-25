import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlayQuiz from "./pages/PlayQuiz";
import ScorePage from "./pages/ScorePage";
import MyQuizzes from "./pages/MyQuizzes";
import CreateQuiz from "./pages/CreateQuiz";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Leaderboard from "./pages/Leaderboard";
import QuizOptions from "./pages/QuizOptions";
import QuizOfflineSelect from "./pages/QuizOfflineSelect";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/quiz/" element={<PrivateRoute><QuizOptions /></PrivateRoute>} />
            <Route path="/quiz/:quizId" element={<PrivateRoute><PlayQuiz /></PrivateRoute>} />
            <Route path="/quiz-offline" element={<PrivateRoute><QuizOfflineSelect /></PrivateRoute>} />
            <Route path="/quiz/play/:quizId" element={<PrivateRoute><PlayQuiz /></PrivateRoute>} />
            <Route path="/quiz/score/:quizId" element={<PrivateRoute><ScorePage /></PrivateRoute>} />
            <Route path="/quiz/me" element={<PrivateRoute><MyQuizzes /></PrivateRoute>} />
            <Route path="/quiz/create" element={<PrivateRoute><CreateQuiz /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;