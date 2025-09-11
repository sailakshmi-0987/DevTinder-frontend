import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${id}`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        const status = err.response?.status;
        if (status === 401) {
          setError("You must be logged in to view this profile.");
        } else if (status === 404) {
          setError("User not found.");
        } else {
          setError("Unable to load profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-20 text-center">
        <p className="text-red-500 text-lg font-medium">{error}</p>
        {error.includes("logged in") && (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary mt-4"
          >
            Go to Login
          </button>
        )}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-200">
      <div className="card bg-base-100 shadow-xl w-96 hover:shadow-2xl transition duration-300">
        <figure className="pt-6">
          <img
            src={user.photoUrl || "https://via.placeholder.com/150"}
            alt="profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-base-200 shadow-md"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <div className="flex justify-center gap-2 mt-2">
            <span className="badge badge-primary">{user.age || "N/A"}</span>
            <span className="badge badge-secondary">{user.gender || "N/A"}</span>
          </div>
          <p className="mt-3 text-gray-700">
            {user.about || "No bio available."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
