import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const userProfileContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const value = { loading, setLoading }

  return (
    <UserContext.Provider value={value}>
    {children}
    </UserContext.Provider>
  );
};
