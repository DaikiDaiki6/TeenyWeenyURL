import { Link } from "@tanstack/react-router";
import SearchUrl from "./SearchUrl";
// import {userState, useEffect} from "react"
// import axios from "../Api/axios"

export default function Header() {
  return (
    <header>
      <div>
        <div className="flex items-center justify-between px-10 mb-auto ">
          <Link to="/">
            <img src="/darkmode_logo.svg" alt="logo" className="w-27 " />
          </Link>
          <SearchUrl />
          <Link to="/profile">
            Profile
            {/* for Profile/Login/Logout */}
          </Link>
        </div>
      </div>
    </header>
  );
}
