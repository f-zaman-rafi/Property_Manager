import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const Navbar = () => {
  return (
    <div>
      {/* Main Navbar container */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {/* Dropdown for mobile view */}
          <div className="dropdown">
            {/* Button to toggle the dropdown menu on mobile */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              {/* Hamburger icon (SVG) for the dropdown */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Menu" // Accessibility improvement: added aria-label
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* Dropdown menu items */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                {/* Link to Home page */}
                <Link to="/">Home</Link>
              </li>
              <li>
                {/* Link to All Properties page */}
                <Link to="/all-properties">All Properties</Link>
              </li>
              <li>
                {/* Dashboard menu with sub-items */}
                <a className="">Dashboard</a>
                <ul className="p-2">
                  {/* Link to Add Property page */}
                  <li>
                    <Link to="/add-property">Add property</Link>
                  </li>
                  {/* Link to Manage Properties page */}
                  <li>
                    <Link to="/manage-property">Manage properties</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Logo Link, redirects to Home */}
          <Link to="/" className="btn btn-ghost text-xl">
            Prop_Manager
          </Link>
        </div>

        {/* Navbar items for desktop view */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* Link to Home page */}
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* Link to All Properties page */}
              <Link to="/all-properties">All Properties</Link>
            </li>
            <li>
              {/* Dropdown for Dashboard menu */}
              <details>
                <summary>Dashboard</summary>
                {/* Dropdown menu items */}
                <ul className="p-2">
                  <li>
                    {/* Link to Add Property page */}
                    <Link to="/add-property">Add property</Link>
                  </li>
                  <li>
                    {/* Link to Manage Properties page */}
                    <Link to="/manage-property">Manage properties</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Link to Statistics page */}
        <div className="navbar-end">
          <Link to="/statistics" className="btn btn-outline">
            Statistics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
