import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./css/Profile.css"; // Import the dedicated CSS file

const Profile = () => {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    gender: "",
    bio: "",
  });

  useEffect(() => {
    API.get("/auth/profile/").then((response) => {
      setProfile(response.data);
    });
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await API.put("/auth/profile/", profile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-card">
        <div className="profile-grid">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key} className="profile-field">
              <label htmlFor={key} className="profile-label">
                {key.replace("_", " ")}
              </label>
              <input
                id={key}
                type="text"
                placeholder={key.replace("_", " ")}
                value={value}
                onChange={(e) =>
                  setProfile({ ...profile, [key]: e.target.value })
                }
                className="profile-input"
              />
            </div>
          ))}
        </div>
        <button className="profile-button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
