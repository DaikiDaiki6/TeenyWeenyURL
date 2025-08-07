import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { AuthService } from "../Api/services";

// Create a context for authentication state
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const checkLoginStatus = useCallback(async () => {
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
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);

      // Immediately update the state to reflect login
      setIsLoggedIn(true);
      setLoading(false);

      // Get user info from the auth check
      try {
        const authResponse = await AuthService.authCheck();
        setUserInfo({
          userId: authResponse.data.userId,
          username: authResponse.data.username,
          message: authResponse.data.message,
          timestamp: authResponse.data.timestamp,
        });
      } catch (authError) {
        console.error("Failed to get user info:", authError);
      }

      setMessage("Login successful");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setMessage(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo(null);
    setMessage("Logged out successfully");
    setLoading(false);
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const value = {
    isLoggedIn,
    userInfo,
    loading,
    message,
    login,
    logout,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
}
