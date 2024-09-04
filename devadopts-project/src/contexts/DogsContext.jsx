import React, { createContext, useState, useContext, useEffect } from 'react';

const DogsContext = createContext();

export const useDogsDetail = () => useContext(DogsContext);

export const DogsProvider = ({ children }) => {
  const [ dogs, setDogs ] = useState([]);
  useEffect(()=>{

    displayDogs();
    
    async function displayDogs() {
      const response = await fetch(`${process.env.REACT_URL}/dogs`);
      const rawData = await response.json();
      const data = rawData.data;
      setDogs(data);
    }
  },[])

  const value = {  dogs, setDogs }
  return (
    <DogsContext.Provider value={value}>
    {children}
    </DogsContext.Provider>
  );
};
