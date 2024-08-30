import React, { createContext, useState, useContext } from 'react';

const DogsContext = createContext();

export const useDogsDetail = () => useContext(DogsContext);

export const DogsProvider = ({ children }) => {
  const [ dogs, setDogs ] = useState([]);
  const value = {  dogs, setDogs }

  return (
    <DogsContext.Provider value={value}>
    {children}
    </DogsContext.Provider>
  );
};
