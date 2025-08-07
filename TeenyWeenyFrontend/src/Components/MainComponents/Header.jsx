import { Link, useNavigate } from "@tanstack/react-router";
import SearchUrl from "./SearchUrl";
import { useSession } from "../Hooks/useSession";

export default function Header() {
  const { isLoggedIn, userInfo, loading, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Add a small delay to ensure state is updated before navigation
    setTimeout(() => {
      navigate({ to: "/" });
    }, 100);
  };

  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="group">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <img src="/darkmode_logo.svg" alt="logo" className="w-8 h-8" />
            </div>
          </Link>

          {isLoggedIn && (
            <div className="flex-1 max-w-md mx-8">
              <SearchUrl />
            </div>
          )}

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-white/80 text-sm">
                  Welcome, {userInfo?.username || "User"}!
                </span>
                <Link
                  to="/profile"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-green-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-purple-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
