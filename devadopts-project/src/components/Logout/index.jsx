import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../../contexts/UserContext';
import './Logout.css';

export default function Logout() {
    const navigate = useNavigate();
    const { token, setToken, setUserId, setFavorites } = useProfileContext();

    async function handleLogout(){
        try{
          const options = {
            headers: {
              "Authorization": "Bearer " + token,
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            method: "GET"
          }
          const response = await fetch(`${process.env.REACT_URL}/users/logout`,options)
          localStorage.removeItem("token");
          setToken(null);
          setUserId(null);
          setFavorites(null);
          if (response.ok){
          navigate('/');
          }
        }
        catch(error){
          console.error(error)
        }
    }
  return (
    <button className='devadopts-logout-button' onClick={handleLogout}>Logout</button>
  )
}
