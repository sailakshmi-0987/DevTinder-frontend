import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false); // ⬅️ default false

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    // ⬅️ only fetch if no user in Redux
    if (!userData) {
      fetchUser();
    }
  }, [dispatch, navigate, userData]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow relative">
        <Outlet />

        {/* Overlay loader instead of full-screen jump */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <p className="text-gray-500 animate-pulse">Loading...</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
