import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Container from "../Container/Container";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./Navbar.css"

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
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
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

            <NavLink to="/register" className="btn btn-secondary">
              Register
            </NavLink>

            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>

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
                className="btn btn-ghost lg:hidden pl-0"
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
