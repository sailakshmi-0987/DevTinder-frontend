import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "./utils/connectionsSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections) || [];
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      // Normalize and filter out falsy entries
      const raw = res?.data?.data || [];
      const clean = Array.isArray(raw)
        ? raw.filter(Boolean).map((u) => ({
            _id: u._id,
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            photoUrl: u.photoUrl || "",
            age: u.age ?? null,
            gender: u.gender || "",
            about: u.about || "",
            skills: Array.isArray(u.skills) ? u.skills : (u.skills ? [u.skills] : []),
          }))
        : [];

      dispatch(addconnections(clean));
    } catch (err) {
      console.error("fetchConnections error:", err);
      setError(err.response?.data?.message || err.message || "Failed to load connections");
    } finally {
      setLoading(false);
    }
  };

  const removeConnection = async (userId) => {
    const ok = window.confirm("Are you sure you want to remove this connection?");
    if (!ok) return;

    try {
      await axios.delete(`${BASE_URL}/connection/remove/${userId}`, {
        withCredentials: true,
      });
      // re-fetch to keep server & client in sync
      fetchConnections();
    } catch (err) {
      console.error("removeConnection error:", err);
      setError(err.response?.data?.message || err.message || "Failed to remove connection");
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Connections</h2>

      {loading ? (
        <div className="text-center py-10">Loading connections...</div>
      ) : error ? (
        <div className="alert alert-error w-full max-w-3xl mx-auto">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      ) : connections.filter(Boolean).length === 0 ? (
        <p className="text-center text-base-content/70">No connections found.</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {connections
            .filter(Boolean)
            .map((user) => (
              <div
                key={user._id}
                className="card card-side bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-all duration-200"
              >
                {/* Profile Photo */}
                <figure className="p-4">
                  <div className="avatar">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user.photoUrl || "https://via.placeholder.com/150"}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </figure>

                {/* Details */}
                <div className="card-body p-4">
                  <h2 className="card-title text-lg">
                    {user.firstName} {user.lastName}
                  </h2>

                  <div className="text-sm text-base-content/70 mb-2">
                    {user.age && <span className="badge badge-outline mr-2">{user.age}</span>}
                    {user.gender && <span className="badge badge-outline">{user.gender}</span>}
                  </div>

                  {user.about && <p className="text-sm text-base-content mb-3">{user.about}</p>}

                  {Array.isArray(user.skills) && user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {user.skills.map((s, idx) => (
                        <span key={idx} className="badge badge-info badge-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="card-actions justify-end mt-3 gap-2">
                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => navigate(`/chat/${user._id}`)}
                      title="Message"
                    >
                      Message
                    </button>

                    <button
                      className="btn btn-outline btn-secondary btn-sm"
                      onClick={() => navigate(`/profile/${user._id}`)}
                    >
                      View Profile
                    </button>

                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => removeConnection(user._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
