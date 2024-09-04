import React from "react";
import { Link } from "react-router-dom";
import "./DogDetailCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// const heartIconStyle = {
//   position: 'absolute',
//   top: '10px',
//   right: '10px',
//   color: '#e74c3c', // Heart color
// };
export default function DogDetailCard({
  dog,
  handleFavoriteToggle,
  isFavorite,
}) {
  return (
    <div className="container-card">
      <div className="card-image-container">
        <img className="dog-image" src={dog.photo} alt={dog.dog_name} />
      </div>
      <div className="card-content">
        <h3 className="dog-name">{dog.dog_name}</h3>
        <p className="dog-info">Gender: {dog.gender}</p>
        <p className="dog-info">Age: {dog.age}</p>
        <p className="dog-info">Breed: {dog.breed}</p>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={() => handleFavoriteToggle(dog.dog_id)} // Toggle favorite status
          className={`heart-icon ${isFavorite ? "favorite" : "not-favorite"}`}
        />
      </div>
      <Link className="more-info-link" to={`/DogsDisplay/${dog.dog_id}`}>
        Want to know more about me?
      </Link>
    </div>
  );

  // return (
  //   <div className='container-card'>
  //     <img  style={{width:"150px", height:"150px"}} src={dog.photo} alt={dog.dog_name} />
  //     <h3>{dog.dog_name}</h3>
  //     <p>Gender: {dog.gender}</p>
  //     <p>Age : {dog.age}</p>
  //     <p>Breed : {dog.breed}</p>
  //     <FontAwesomeIcon
  //       icon={faHeart}
  //       style={{position: 'absolute', top: '10px',right: '10px',
  //         color: '#e74c3c' }}
  //       onClick={() => handleFavoriteToggle(dog.dog_id)} // Toggle favorite status
  //       className={isFavorite ? 'favorite' : 'not-favorite'}
  //     />
  //     <Link to={`/DogsDisplay/${dog.dog_id}`}>Do you like to know more about me?</Link>
  //   </div>
  // )
}
