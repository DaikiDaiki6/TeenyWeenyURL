import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSession } from "../Hooks/useSession";

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { isLoggedIn, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isLoggedIn) {
        navigate({ to: "/" });
      } else if (!requireAuth && isLoggedIn) {
        navigate({ to: "/dashboard" });
      }
    }
  }, [isLoggedIn, loading, navigate, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if ((requireAuth && isLoggedIn) || (!requireAuth && !isLoggedIn)) {
    return children;
  }

  return null;
}
