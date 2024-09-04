import React, {useState,useEffect} from 'react';
import { useDogsDetail } from '../../contexts/DogsContext';
import { Link } from 'react-router-dom';
import './FavoriteDogs.css'

export default function FavoriteDogs() {
const { dogs } = useDogsDetail();
const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");

  const trueFavorites = Object.keys(storedFavorites).filter(key => storedFavorites[key] === true);

  setFavorites(trueFavorites);
}, []); 
  return (
    <div className="favorite-dogs-container">  {/* Apply class for styling */}
    <h3 className="title">Favorite Dogs</h3>
    <div className="favorites-list">  {/* Wrap the list items */}
      {favorites.map((dogId) => {
        const dog = dogs.find(dog => dog.dog_id === Number(dogId));
        return (
          <div key={dogId} className="favorite-dog-card">  {/* Apply card styling */}
            {dog ? ( 
              <Link to={`/DogsDisplay/${dog.dog_id}`} className="dog-link">  {/* Styled link */}
              <img src={dog.photo} alt={dog.dog_name} className="dog-photo" />
              <span className="dog-name">{dog.dog_name}</span>
              </Link>
            ) : (
              <p>Dog not found</p>
            )}
          </div>
        );
      })}
    </div>
  </div>
  )
}
