import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSession } from "../Hooks/useSession";
import { AuthService } from "../Api/services";

export default function RegisterForm() {
  const { isLoggedIn, userInfo, loading, message } = useSession();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterMessage("");

    // Check if all fields are filled
    if (
      !registerData.username.trim() ||
      !registerData.password.trim() ||
      !confirmPassword.trim()
    ) {
      setRegisterMessage("Please fill in all fields");
      return;
    }

    if (registerData.password !== confirmPassword) {
      setRegisterMessage("Passwords do not match!");
      return;
    }
    try {
      const response = await AuthService.register(registerData);
      setRegisterMessage("Registration successful! You can now login.");
      setRegisterData({
        username: "",
        password: "",
      });
      setConfirmPassword("");
    } catch (error) {
      let errorMessage = "Registration failed";
      if (error.response?.data) {
        // Handle validation errors from backend
        if (error.response.data.errors) {
          // Multiple validation errors
          const errorMessages = Object.values(
            error.response.data.errors
          ).flat();
          errorMessage = errorMessages.join(", ");
        } else if (error.response.data.message) {
          // Single error message
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === "string") {
          // String error
          errorMessage = error.response.data;
        } else {
          // Fallback for other error formats
          errorMessage = "Registration failed: Invalid data";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setRegisterMessage(errorMessage);
    }
  };

  const inputCheck = (e) => {
    if (e.target.name == "username") {
      setRegisterData({
        ...registerData,
        username: e.target.value,
      });
    } else if (e.target.name == "password") {
      setRegisterData({
        ...registerData,
        password: e.target.value,
      });
    } else if (e.target.name == "confirm_password") {
      setConfirmPassword(e.target.value);
    }
  };

  // Check if form is valid for disabling button
  const isFormValid =
    registerData.username.trim() &&
    registerData.password.trim() &&
    confirmPassword.trim() &&
    registerData.password === confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 space-y-6 shadow-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">
              Create Account
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Join us and start shortening URLs
            </p>
          </div>

          {registerMessage && (
            <div
              className={`p-3 rounded-lg text-center text-sm ${
                registerMessage.includes("successful")
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-300 border border-red-500/20"
              }`}
            >
              {registerMessage}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter username..."
                  name="username"
                  value={registerData.username}
                  onChange={inputCheck}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter password..."
                  name="password"
                  value={registerData.password}
                  onChange={inputCheck}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password..."
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={inputCheck}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 ${
                    confirmPassword && registerData.password !== confirmPassword
                      ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                      : "border-white/10"
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 ${
                  loading || !isFormValid
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <p className="text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
