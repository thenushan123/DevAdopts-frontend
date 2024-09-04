import React, { useState, useEffect } from "react";
import { useDogsDetail } from "../../contexts/DogsContext";
import { Link } from "react-router-dom";
import "./FavoriteDogs.css";
import { useProfileContext } from "../../contexts/UserContext";

export default function FavoriteDogs() {
  const { dogs } = useDogsDetail(); // Get list of all dogs
  const [favorites, setFavorites] = useState([]); // State to store favorite dog IDs
  const { loading, setLoading } = useProfileContext(); // Use loading state from context

  useEffect(() => {
    setLoading(true); // Start loading
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "{}"
    );

    const trueFavorites = Object.keys(storedFavorites).filter(
      (key) => storedFavorites[key] === true
    );

    setFavorites(trueFavorites);
    setLoading(false);
  }, [setLoading]);

  // Debugging: Check if dogs data is available and favorites are set correctly
  console.log("dogs", dogs);
  console.log("favorites", favorites);

  return (
    <div className="favorite-dogs-container">
      {" "}
      {/* Apply class for styling */}
      <h3 className="favorite-title">Favorite Dogs</h3>
      {loading ? ( // Show loading indicator
        <p>Loading favorite dogs...</p>
      ) : (
        <div className="favorites-list">
          {" "}
          {/* Wrap the list items */}
          {favorites.length > 0 ? ( // Check if there are favorite dogs
            favorites.map((dogId) => {
              const dog = dogs.find((dog) => String(dog.dog_id) === dogId); // Ensure both are strings for comparison
              return (
                <div key={dogId} className="favorite-dog-card">
                  {" "}
                  {/* Apply card styling */}
                  {dog ? (
                    <Link
                      to={`/DogsDisplay/${dog.dog_id}`}
                      className="dog-link"
                    >
                      {" "}
                      {/* Styled link */}
                      <img
                        src={dog.photo}
                        alt={dog.dog_name}
                        className="dog-photo"
                      />
                      <span className="dog-name">{dog.dog_name}</span>
                    </Link>
                  ) : (
                    <p>Dog not found</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No favorite dogs found.</p> // Handle case where no favorites are found
          )}
        </div>
      )}
    </div>
  );
}
