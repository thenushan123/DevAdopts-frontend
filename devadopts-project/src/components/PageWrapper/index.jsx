import React from 'react';
import './PageWrapper.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function PageWrapper() {
  return (
    <>
        <header className='navbar-container navbar'>
            <nav>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/donate">Donate</NavLink>
                <NavLink to="/AboutUs">About Us</NavLink>
            </nav>
        </header>
        <Outlet />
        <footer className='footer'>
            <nav>
                <p>Copyright 2024</p>
            </nav>
        </footer>
    </>
  )
}
