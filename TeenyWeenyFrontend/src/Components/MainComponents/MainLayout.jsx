import { Outlet } from "@tanstack/react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
