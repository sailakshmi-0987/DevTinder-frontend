import React from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import { removeUser } from './utils/userSlice';

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl font-bold text-white hover:scale-105 transition-transform duration-300"
        >
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">
            Welcome, <span className="font-bold">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-white transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img
                  alt="User avatar"
                  src={user.photoUrl}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200"
            >
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
