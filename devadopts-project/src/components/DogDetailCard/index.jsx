import React from 'react';
import { Link } from 'react-router-dom';
import './DogDetailCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function DogDetailCard({dog, handleFavoriteToggle, isFavorite }) {

  return (
    <div className='dog-detail-container-card'>
      <img  style={{width:"150px", height:"150px"}} src={dog.photo} alt={dog.dog_name} />
      <h3>{dog.dog_name}</h3>
      <FontAwesomeIcon
        icon={faHeart}
        onClick={() => handleFavoriteToggle(dog.dog_id)} // Toggle favorite status
        className={isFavorite ? 'favorite' : 'not-favorite'} beat
      />
      <p>Gender: {dog.gender}</p>
      <p>Age : {dog.age}</p>
      <p>Breed : {dog.breed}</p>
      <Link to={`/DogsDisplay/${dog.dog_id}`}>Do you like to know more about me?</Link>
    </div>
  )
}