import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    async function handleLogout(){
        try{
          const options ={
            Authorization : "Bearer "+ localStorage.getItem("token"),
            method : "GET"
          }
          const response = await fetch(`${process.env.REACT_URL}/users/logout`,options)
          console.log("response", response);
          if (response.ok){
          navigate('/login');
          }
        }
        catch(error){
          console.error(error)
        }
    }
  return (
   <button onClick={handleLogout}>Logout</button>
  )
}
