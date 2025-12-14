import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Container from "../Container/Container";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./Navbar.css"
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

const Navbar = () => {
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

 const { user, signoutUserFunc, setUser, loading, setLoading } = useAuth();
 
  const handleSignout = () => {
    signoutUserFunc()
      .then(() => {
        toast.success("Signout successful");
        setUser(null);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-loans">All Loans</NavLink>
      </li>
     
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
       {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <Container>
        <div className="navbar px-0">
          <div className="navbar-start">
            <Link to="/" className="text-xl pl-0 font-bold">
              LoanZone
            </Link>
          </div>

          <div className="navbar-end gap-2">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
            </div>

            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "luxury" ? (
                <MdOutlineLightMode size={26} />
              ) : (
                <MdOutlineDarkMode size={26} />
              )}
            </button>

            {loading && !user ? (
              <HashLoader color="#36d7b7" size={30} />
            ) : user ? (
              <div className="flex gap-2 items-center">
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
                        <span className="font-bold">{user.displayName}</span>
                        <span className="text-xs">{user.email}</span>
                      </div>
                    </li>
                    {/* <div className="divider my-0"></div>
                    <li>
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
            ) : (
              <div className="flex gap-2">
                <NavLink to="/register" className="btn btn-secondary">
                  Register
                </NavLink>
                <NavLink to="/login" className="btn btn-primary">
                  Login
                </NavLink>
              </div>
            )}

            <div className="dropdown dropdown-end lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost pl-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navLinks}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
