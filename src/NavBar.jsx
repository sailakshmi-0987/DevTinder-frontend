import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // ⬅️ added useLocation
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ get current route

  const handleLogout = async () => {
    
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // hide user info if on login/signup page
  const hideUserInfo =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg px-4">
      {/* Left Section - Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl font-bold text-white hover:scale-105 transition-transform duration-300"
        >
          DevTinder
        </Link>
      </div>

      {/* Right Section - User Info */}
      {user && !hideUserInfo && (   // ⬅️ added condition here
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-white font-medium">
            Hi, <span className="font-bold">{user.firstName}</span>
          </span>

          {/* Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-white transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-gray-200 text-gray-700 font-bold">
                {user.photoUrl ? (
                  <img
                    alt="User avatar"
                    src={user.photoUrl}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  user.firstName?.[0] || "U"
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200"
            >
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `rounded-lg transition-colors ${
                      isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/connections"
                  className={({ isActive }) =>
                    `rounded-lg transition-colors ${
                      isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                    }`
                  }
                >
                  Connections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    `rounded-lg transition-colors ${
                      isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                    }`
                  }
                >
                  Requests
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
