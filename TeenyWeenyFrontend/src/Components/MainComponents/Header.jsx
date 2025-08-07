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
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10 shadow-sm relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="group flex items-center gap-3"
          >
            <div className="p-2 bg-blue-600 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200">
              <img src="/logo_only.svg" alt="logo" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-400 transition-all duration-300 drop-shadow-sm">
              twurl
            </span>
          </Link>

          {isLoggedIn && (
            <div className="absolute left-1/2 transform -translate-x-1/2 max-w-md w-full px-4">
              <SearchUrl />
            </div>
          )}

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-slate-300 text-sm">
                  Welcome, {userInfo?.username || "User"}!
                </span>
                <Link
                  to="/profile"
                  className="bg-white/10 text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/10"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/"
                  className="bg-white/10 text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
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
