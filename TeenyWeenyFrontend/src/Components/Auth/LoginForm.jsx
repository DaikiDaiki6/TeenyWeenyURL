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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 space-y-6 shadow-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
            <p className="text-slate-400 mt-2 text-sm">
              Sign in to your account
            </p>
          </div>

          {loginMessage && (
            <div
              className={`p-3 rounded-lg text-center text-sm ${
                loginMessage.includes("successful")
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-300 border border-red-500/20"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter password..."
                name="password"
                value={loginData.password}
                onChange={inputCheck}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={
                loading ||
                !loginData.username.trim() ||
                !loginData.password.trim()
              }
              className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 ${
                loading ||
                !loginData.username.trim() ||
                !loginData.password.trim()
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
