import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedFromUser } from "./utils/feedSlice";
import ErrorMessage from "./ErrorMessage";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleSendRequest = async (status, userId) => {
    setError(null);
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedFromUser(userId));
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (err.response) {
        if (err.response.status === 401) {
          message = "You must be logged in to perform this action.";
        } else if (err.response.status === 404) {
          message = "This user no longer exists.";
        } else if (err.response.status >= 500) {
          message = "Server error. Please try again later.";
        }
      } else if (err.request) {
        message = "Network issue. Please check your internet connection.";
      }
      setError(message);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-lg rounded-xl border border-base-300 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <ErrorMessage text={error} onClose={() => setError(null)} />

      <figure className="relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-72 object-cover rounded-t-xl"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent px-4 py-2">
          <h2 className="text-white font-semibold text-lg">
            {firstName} {lastName}
          </h2>
        </div>
      </figure>

      <div className="card-body px-5 py-4">
        {age && gender && (
          <p className="text-sm text-gray-500">
            {age}, {gender}
          </p>
        )}
        {about && <p className="mt-2 text-sm leading-relaxed">{about}</p>}

        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-outline btn-error px-4"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary px-4"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
