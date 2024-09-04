import React ,{useEffect,useState}from "react";
import "./PageWrapper.css";
import { NavLink, Outlet } from "react-router-dom";
import { Logout } from "../index";

export default function PageWrapper() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(()=>{
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [])

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
