import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">
                  <a>Home</a>
                </Link>
              </li>
              <Link to="/all-properties">
                <li>
                  <a>All Properties</a>
                </li>
              </Link>
              <li>
                <a>Dashboard</a>
                <ul className="p-2">
                  <li>
                    <a>
                      <Link to="/add-property">Add property</Link>
                    </a>
                  </li>
                  <Link to="/manage-property">
                    <li>
                      <a>Manage properties</a>
                    </li>
                  </Link>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/">
            <a className="btn btn-ghost text-xl">Prop_Manager</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>
                <Link to="/">Home</Link>
              </a>
            </li>
            <Link to="/all-properties">
              <li>
                <a>All Properties</a>
              </li>
            </Link>
            <li>
              <details>
                <summary>Dashboard</summary>
                <ul className="p-2">
                  <Link to="/add-property">
                    <a>Add property</a>
                  </Link>
                  <Link to="/manage-property">
                    <li>
                      <a>Manage properties</a>
                    </li>
                  </Link>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
