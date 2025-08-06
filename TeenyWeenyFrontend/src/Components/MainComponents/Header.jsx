import { Link } from "@tanstack/react-router";
import SearchUrl from "./SearchUrl";
// import {userState, useEffect} from "react"
// import axios from "../Api/axios"

export default function Header() {
  return (
    <header>
      <div>
        <div className="flex items-center justify-between px-6 py-3 mb-auto ">
          <div className="flex space-x-2">
            <>
              <Link to="/">
                <img src="/vite.svg" alt="logo" />
              </Link>
            </>
            <>
              <Link to="/">twurl</Link>
            </>
          </div>

          <SearchUrl />
          <Link to="/profile">
            Profile-Dropdown
            {/* for Profile/Login/Logout */}
          </Link>
        </div>
      </div>
    </header>
  );
}
