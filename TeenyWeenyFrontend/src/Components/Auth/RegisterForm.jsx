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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-300 mt-2">
              Join us and start shortening URLs
            </p>
          </div>

          {registerMessage && (
            <div
              className={`p-3 rounded-lg text-center ${
                registerMessage.includes("successful")
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter password..."
                  name="password"
                  value={registerData.password}
                  onChange={inputCheck}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password..."
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={inputCheck}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    confirmPassword && registerData.password !== confirmPassword
                      ? "border-red-500/50 focus:ring-red-500"
                      : "border-white/20"
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg ${
                  loading || !isFormValid
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 hover:shadow-purple-500/25"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
