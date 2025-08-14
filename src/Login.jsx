import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    setError("");
    setSuccessMsg("");
  };

  const handleLogin = async () => {
    clearMessages();
    if (!form.email || !form.password) {
      return setError("Please enter both email and password.");
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email: form.email, password: form.password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    clearMessages();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      return setError("Please fill in all fields to sign up.");
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    clearMessages();
    if (!form.email) {
      return setError("Please enter your email to reset password.");
    }
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/forgot-password`, { email: form.email });
      setSuccessMsg("Password reset link sent to your email.");
    } catch (err) {
      setError(err?.response?.data || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE AUTH SETUP
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // store in .env
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/google`,
        { credential: response.credential },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Google login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-white rounded-2xl overflow-hidden transition-transform transform hover:scale-105">
        <div className="card-body p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {isForgotPassword
              ? "Reset Password 🔑"
              : isLoginForm
              ? "Welcome Back 👋"
              : "Join Us 🚀"}
          </h2>

          {isForgotPassword ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mb-4 focus:ring-2 focus:ring-purple-400"
                value={form.email}
                onChange={handleChange}
              />
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              {successMsg && (
                <p className="text-green-500 text-sm mb-3">{successMsg}</p>
              )}
              <button
                disabled={loading}
                className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                onClick={handleForgotPassword}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <p
                className="mt-5 text-sm text-gray-600 cursor-pointer hover:underline"
                onClick={() => {
                  setIsForgotPassword(false);
                  clearMessages();
                }}
              >
                Back to Login
              </p>
            </>
          ) : (
            <>
              {!isLoginForm && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="input input-bordered w-full mb-4 focus:ring-2 focus:ring-purple-400"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="input input-bordered w-full mb-4 focus:ring-2 focus:ring-purple-400"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input input-bordered w-full mb-4 focus:ring-2 focus:ring-purple-400"
                value={form.email}
                onChange={handleChange}
              />

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full focus:ring-2 focus:ring-purple-400"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              {successMsg && (
                <p className="text-green-500 text-sm mb-3">{successMsg}</p>
              )}

              <button
                disabled={loading}
                className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {loading
                  ? isLoginForm
                    ? "Logging in..."
                    : "Signing up..."
                  : isLoginForm
                  ? "Login"
                  : "Sign Up"}
              </button>

              {/* Google Login Button */}
              <div className="mt-4">
                <div id="googleLoginDiv"></div>
              </div>

              {isLoginForm && (
                <p
                  className="mt-3 text-sm text-blue-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setIsForgotPassword(true);
                    clearMessages();
                  }}
                >
                  Forgot password?
                </p>
              )}

              <p
                className="mt-5 text-sm text-gray-600 cursor-pointer hover:underline"
                onClick={() => {
                  setIsLoginForm((value) => !value);
                  clearMessages();
                }}
              >
                {isLoginForm
                  ? "New here? Create an account"
                  : "Already have an account? Login"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

