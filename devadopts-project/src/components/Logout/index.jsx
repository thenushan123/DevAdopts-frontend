import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        navigate('/login');
    }
  return (
   <button onClick={handleLogout}>Logout</button>
  )
}
