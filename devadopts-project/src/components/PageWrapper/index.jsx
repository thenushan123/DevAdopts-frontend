import React from "react";
import "./PageWrapper.css";
import { NavLink, Outlet } from "react-router-dom";

export default function PageWrapper() {
  return (
    <>
      <header className="navbar-container">
        <div className="navbar">
          <div className="brand">
            <img
              src="your-icon-path.png"
              alt="DevAdopts Logo"
              className="brand-icon"
            />
            <h1>DevAdopts</h1>
          </div>
          <nav className="nav-links">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/donate">Donate</NavLink>
            <NavLink to="/AboutUs">About Us</NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <nav>
          <p>Copyright 2024</p>
        </nav>
      </footer>
    </>
  );
}
