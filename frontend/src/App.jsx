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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/" element={<QuizOptions />} />
            <Route path="/quiz/:quizId" element={<PlayQuiz />} />
            <Route path="/quiz-offline" element={<QuizOfflineSelect />} />
            <Route path="/quiz/play/:quizId" element={<PlayQuiz />} />
            <Route path="/quiz/score/:quizId" element={<ScorePage />} />
            <Route path="/quiz/me" element={<MyQuizzes />} />
            <Route path="/quiz/create" element={<CreateQuiz />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;