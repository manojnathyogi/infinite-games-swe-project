import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Leaderboard.css'; // Assuming you want to add some custom styling

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('/api/leaderboard'); // Replace with your actual endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Render the leaderboard
  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.sort((a, b) => b.score - a.score).map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
