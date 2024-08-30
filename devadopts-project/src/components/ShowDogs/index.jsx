import React, {useEffect, useState} from 'react';
import { useDogsDetail } from '../../contexts/DogsContext';
import DogDetailCard from '../DogDetailCard';
import './ShowDogs.css';

export default function ShowDogs() {
    const { dogs, setDogs} = useDogsDetail();

    useEffect(() => {
        async function displayDogsInformation() {
            const response = await fetch("http://localhost:3000/dogs");
            const rawData = await response.json();
            const data = rawData.data
            setDogs(data);
        }
        displayDogsInformation();
      
      }, []);
    
  return (
    <div className='dogs-list'>
        {dogs.map((dog) => (
            <DogDetailCard key={dog.dog_id} dog={dog} />
            ))}
    </div>
  )
}
