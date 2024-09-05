import React from "react";
import "./PageWrapper.css";
import { NavLink, Outlet } from "react-router-dom";
import { Logout } from "../index";
import { useProfileContext } from "../../contexts/UserContext";

export default function PageWrapper() {
  const { token } = useProfileContext();


  return (
    <>
      <header className="navbar-container">
        <div className="navbar">
          <div className="brand">
            <img
              src="/images/DevAdopts_Logo.PNG"
              alt="DevAdopts Logo"
              className="brand-icon"
            />
            <NavLink to='/'>
              <h1 style={{color:"black"}}>DevAdopts</h1>
            </NavLink>
          </div>
          <nav className="nav-links">
            {!token ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : null}
            <NavLink to="/AboutUs">About Us</NavLink>
            <NavLink to="/donate">Donate</NavLink>
            {token ? (
              <>
                <NavLink to="/userprofile">UserProfile</NavLink>
                <Logout />
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
