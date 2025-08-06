import {Outlet } from "@tanstack/react-router"
import Header from "./Header"
import Footer from "./Footer"

export default function MainLayout() {
    return (
        <div className="bg-black/90 text-white min-h-screen flex flex-col">
            <Header />
            <main className="bg-black/50 flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}