// New Code

// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const NavBar = () => {
//   const { isLoggedIn, logout } = useAuth();

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-lg font-bold">
//           Home
//         </Link>
//         <div className="space-x-4">
//           <Link to="/leaderboard" className="text-white">
//             LeaderBoard
//           </Link>
//           {isLoggedIn ? (
//             <>
//               <Link to="/dashboard" className="text-white">
//                 Dashboard
//               </Link>
//               <Link to="/profile" className="text-white">
//                 Profile
//               </Link>
//               <button onClick={logout} className="text-white">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-white">
//                 Login
//               </Link>
//               <Link to="/signup" className="text-white">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

// Recent working code

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <div className="space-x-4">
        <Link to="/leaderboard" className="text-white">
            LeaderBoard
          </Link>
          <Link to="/login" className="text-white">
            Login
          </Link>
          <Link to="/signup" className="text-white">
            Sign Up
          </Link>
          <Link to="/dashboard" className="text-white">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;