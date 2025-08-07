import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSession } from "../Hooks/useSession";

export default function LoginForm() {
  const { isLoggedIn, userInfo, loading, message, login } = useSession();
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage("");

    if (!loginData.username.trim() || !loginData.password.trim()) {
      setLoginMessage("Please fill in all fields");
      return;
    }

    try {
      const result = await login(loginData);
      if (result.success) {
        setLoginMessage("Login successful! You are now logged in.");
        setLoginData({
          username: "",
          password: "",
        });
        setTimeout(() => {
          navigate({ to: "/dashboard" });
        }, 600);
      } else {
        setLoginMessage(result.error || "Login failed");
      }
    } catch (error) {
      let errorMessage = "Login failed";
      if (error.response?.data) {
        if (error.response.data.errors) {
          const errorMessages = Object.values(
            error.response.data.errors
          ).flat();
          errorMessage = errorMessages.join(", ");
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else {
          errorMessage = "Login failed: Invalid data";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setLoginMessage(errorMessage);
    }
  };

  const inputCheck = (e) => {
    if (e.target.name == "username") {
      setLoginData({
        ...loginData,
        username: e.target.value,
      });
    } else if (e.target.name == "password") {
      setLoginData({
        ...loginData,
        password: e.target.value,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-300 mt-2">Sign in to your account</p>
          </div>

          {loginMessage && (
            <div
              className={`p-3 rounded-lg text-center ${
                loginMessage.includes("successful")
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
            >
              {loginMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter username..."
                name="username"
                value={loginData.username}
                onChange={inputCheck}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter password..."
                name="password"
                value={loginData.password}
                onChange={inputCheck}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={
                loading ||
                !loginData.username.trim() ||
                !loginData.password.trim()
              }
              className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg ${
                loading ||
                !loginData.username.trim() ||
                !loginData.password.trim()
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 hover:shadow-purple-500/25"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-300">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
