import React, { useEffect, useState } from "react";
import "./PageWrapper.css";
import { NavLink, Outlet } from "react-router-dom";
import { Logout } from "../index";
import { jwtDecode } from "jwt-decode";

export default function PageWrapper() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {  
      try {
        const obj = jwtDecode(token);
        const user_id = obj.user_id;
        setUserId(user_id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [userId]);

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
            {!userId ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : null}
            <NavLink to="/donate">Donate</NavLink>
            <NavLink to="/AboutUs">About Us</NavLink>
            {userId ? (
              <>
                <Logout />
                <NavLink to="/userprofile">UserProfile</NavLink>
              </>
            ) : null}
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
