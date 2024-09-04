import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useProfileContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  

  useEffect(() => {
    const objectToken = token && jwtDecode(token);
    if (objectToken) {
      setUserId(objectToken.user_id);
    }
  }, [token])


  const value = { loading, setLoading, userId, setUserId, token, setToken }
  
  return (
    <UserContext.Provider value={value}>
    {children}
    </UserContext.Provider>
  );
};
