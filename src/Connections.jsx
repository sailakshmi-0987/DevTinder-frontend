import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "./utils/connectionsSlice";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections) || [];
  //const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

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
            skills: Array.isArray(u.skills) ? u.skills : u.skills ? [u.skills] : [],
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
      fetchConnections();
    } catch (err) {
      console.error("removeConnection error:", err);
      setError(err.response?.data?.message || err.message || "Failed to remove connection");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Connections</h2>

      {loading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg mb-6">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && connections.filter(Boolean).length === 0 && (
        <p className="text-center text-base-content/70 py-8">
          No connections found.
        </p>
      )}

      {!loading && !error && connections.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {connections.map((user) => (
            <div
              key={user._id}
              className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="card-body flex-row gap-4">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoUrl || "https://via.placeholder.com/150"}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="text-sm text-base-content/70 mb-2">
                    {user.age && <span className="badge badge-outline mr-2">{user.age}</span>}
                    {user.gender && <span className="badge badge-outline">{user.gender}</span>}
                  </div>
                  {user.about && <p className="text-sm mb-3">{user.about}</p>}

                  {user.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {user.skills.map((s, idx) => (
                        <span key={idx} className="badge badge-info badge-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto flex gap-2 justify-end">
                 
                    <button
                      className="btn btn-outline btn-secondary btn-sm"
                      
                    >
                      <Link to ={`/profile/${user._id}`} >View Profile</Link>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;

