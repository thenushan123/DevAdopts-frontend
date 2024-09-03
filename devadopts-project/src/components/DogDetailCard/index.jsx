import React from 'react';
import { Link } from 'react-router-dom';
import './DogDetailCard.css';

export default function DogDetailCard({dog}) {
  return (
    <div className='container-card'>
        <img  style={{width:"150px", height:"150px"}} src={dog.photo} alt={dog.dog_name} />
        <h3>{dog.dog_name}</h3>
        <p>Gender: {dog.gender}</p>
        <p>Age : {dog.age}</p>
        <p>Breed : {dog.breed}</p>
        <Link to={`/DogsDisplay/${dog.dog_id}`}>Do you like to know more about me?</Link>
      </div>
  )
}