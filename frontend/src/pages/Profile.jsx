import React, { useState, useEffect } from "react";
import API from "../utils/api";

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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="card shadow-md">
        <div className="card-body">
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(profile).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace("_", " ")}
                value={profile[key]}
                onChange={(e) =>
                  setProfile({ ...profile, [key]: e.target.value })
                }
                className="input input-bordered w-full"
              />
            ))}
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
