import React, { useState, useEffect } from "react";
import { useDogsDetail } from "../../contexts/DogsContext";
import DogDetailCard from "../DogDetailCard";
import "./ShowDogs.css";
import MapDisplay from "../MapDisplay";
import { useProfileContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export default function ShowDogs() {
  const { dogs, setDogs } = useDogsDetail();
  const [postcode, setPostcode] = useState("");
  const [errorPostCode, setErrorPostCode] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [searchedDogs, setSearchedDogs] = useState([]);
  const [radius, setRadius] = useState(50);
  const [favorites, setFavorites] = useState({});
  const {loading, setLoading} =useProfileContext();
  
  useEffect(() => {
    setSearchedDogs(dogs)
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // deg2rad
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const validatePostcode = () => {
    const ukPostcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    if (!ukPostcodePattern.test(postcode)) {
      setErrorPostCode(true);
      return false;
    }
    setErrorPostCode(false);
    return true;
  };

  const handleFavoriteToggle = (dogId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [dogId]: !prevFavorites[dogId],
    }));
  };

  const handleSearch = async () => {
    setSearchInitiated(true);
    setLoading(true)
    try {
      // Fetch geocode for all dogs and user's postcode
      const dogsWithLatLng = await Promise.all(
        dogs.map(async (dog) => {
          
          try {
            const geoResponse = await fetch(
              `${process.env.REACT_URL}/maps/geocode/zip/?postcode=${dog.shelter_location_postcode}`
            );
            const geoData = await geoResponse.json();
            const { latitude, longitude } = geoData.data;
            return { ...dog, latitude, longitude };
          } catch (error) {
            console.error(
              `Error fetching geocode for postcode ${dog.shelter_location_postcode}:`,
              error
            );
            return dog; 
          }
        })
      );

      if (postcode === "" || !validatePostcode()) {
        setSearchedDogs(dogsWithLatLng);
      } 
      else {
        try{
        const userGeoResponse = await fetch(
          `${process.env.REACT_URL}/maps/geocode/zip/?postcode=${postcode}`
        );
        const userGeoData = await userGeoResponse.json();
        const { latitude: userLat, longitude: userLng } = userGeoData.data;

        const filteredDogs = dogsWithLatLng
          .map((dog) => {
            const distance = calculateDistance(
              userLat,
              userLng,
              dog.latitude,
              dog.longitude
            );
            return { ...dog, distance };
          })
          .filter((dog) => dog.distance <= radius)
          .sort((a, b) => a.distance - b.distance);

        setSearchedDogs(filteredDogs);
        }
        catch(error){
          console.error("Error fetching user geocode:", error);
        }
      }
      setLoading(false);
      setSearchInitiated(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during search:", error);
      setSearchInitiated(false);
    }
  };

  return (
    <div className="search-bar-main">
      <h2>Find a dog to adopt</h2>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Search by postcode or breed"
        />
        {errorPostCode && (
          <p style={{ color: "red" }}>Please enter a correct postcode</p>
        )}
        <label>Radius: {radius} km</label>
        <div className="slidecontainer">
          <input
            type="range"
            min="1"
            max="100"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="slider"
            id="myRange"
          />
        </div>
        <button className="search-dogs" onClick={handleSearch}>
          Search
        </button>
        {searchInitiated && postcode === "" && (
          <p style={{ color: "red" }}>Please enter a postcode</p>
        )}
      </div>

      {searchedDogs.length > 0 && <MapDisplay searchedDogs={searchedDogs} />}
      <div className="dogs-list">
        {searchedDogs.map((dog) => (
          <DogDetailCard
            key={dog.dog_id}
            dog={dog}
            handleFavoriteToggle={handleFavoriteToggle}
            isFavorite={!!favorites[dog.dog_id]}
          />
        ))}
      </div>
      {loading ? (
        <div className="loading-container-dogsdisplay">
          <FontAwesomeIcon icon={faSpinner} pulse size="5x" />
        </div>
        ) : null}
    </div>
  );
}
