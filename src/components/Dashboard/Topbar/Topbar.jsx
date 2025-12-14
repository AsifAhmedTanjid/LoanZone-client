import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Topbar({ handleToggle }) {
  const { signoutUserFunc, user, loading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "caramellatte");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "luxury") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "luxury" ? "caramellatte" : "luxury");
  };

  const handleSignout = () => {
      signoutUserFunc()
        .then(() => toast.success("Logged out"))
        .catch(err => toast.error(err.message));
  };

  return (
    <div className="flex items-center justify-between px-6 py-2.75 bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-2 focus:outline-none focus:bg-gray-200 lg:hidden text-base-content"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
        <Link to="/" className="text-xl font-bold text-base-content">
          LoanZone
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "luxury" ? (
            <MdOutlineLightMode size={26} />
          ) : (
            <MdOutlineDarkMode size={26} />
          )}
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full flex justify-center items-center">
              {loading ? (
                <HashLoader color="#36d7b7" size={20} />
              ) : (
                <img
                  referrerPolicy="no-referrer"
                  alt="User Avatar"
                  src={
                    user?.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  }
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <div className="flex flex-col items-start gap-0 pointer-events-none">
                <span className="font-bold">{user?.displayName}</span>
                <span className="text-xs">{user?.email}</span>
              </div>
            </li>
            {/* <div className="divider my-0"></div> */}
            {/* <li>
              <Link to="/dashboard/my-loans">My Loans</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li> */}
          </ul>
        </div>
        <button
          onClick={handleSignout}
          className="btn btn-error text-white"
        >
          {loading ? <HashLoader color="white" size={20} /> : "Logout"}
        </button>
      </div>
    </div>
  );
}