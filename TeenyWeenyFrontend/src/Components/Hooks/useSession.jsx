import { useState, useEffect } from "react";
import { AuthService } from "../Api/services";

export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await AuthService.authCheck();
        setIsLoggedIn(true);
        setUserInfo({
          userId: response.data.userId,
          username: response.data.username,
          message: response.data.message,
          timestamp: response.data.timestamp,
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        setUserInfo(null);
        localStorage.removeItem("token");
      }
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      await checkLoginStatus();
      setMessage("Login successful");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setMessage(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo(null);
    setMessage("Logged out successfully");
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return {
    isLoggedIn,
    userInfo,
    loading,
    message,
    login,
    logout,
    checkLoginStatus,
  };
}