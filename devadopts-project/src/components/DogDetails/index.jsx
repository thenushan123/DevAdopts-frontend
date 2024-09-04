import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdoptionCosts from "../AdoptionCosts";
import "./DogDetails.css";

export default function DogDetails() {
  const [dogData, setDogData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function searchAPI() {
      try {
        const response = await fetch(
          `${process.env.REACT_URL}/dogs/${parseInt(id)}`
        );
        const rawData = await response.json();
        const data = rawData.data;
        setDogData(data);
      } catch (err) {
        console.error("Error fetching dog data:", err);
      }
    }
    searchAPI();
  }, [id]);

  if (!dogData) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className="dog-details-container">
      <div className="dog-header">
        <img className="dog-photo" src={dogData.photo} alt={dogData.dog_name} />
        <h1 className="dog-name">{dogData.dog_name}</h1>
      </div>
      <div className="dog-info-grid">
        <div className="dog-info-column">
          <p>
            <strong>Breed:</strong> {dogData.breed}
          </p>
          <p>
            <strong>Age:</strong> {dogData.age} years
          </p>
          <p>
            <strong>Gender:</strong> {dogData.gender}
          </p>
          <p>
            <strong>Color:</strong> {dogData.colour}
          </p>
          <p>
            <strong>Size:</strong> {dogData.size}
          </p>
          <p>
            <strong>Activity Levels:</strong> {dogData.activity_levels}
          </p>
          <p>
            <strong>Allergenic Level:</strong> {dogData.allergenic}
          </p>
          <p>
            <strong>Adopted:</strong> {dogData.adopted ? "Yes" : "No"}
          </p>
        </div>
        <div className="dog-info-column">
          <p>
            <strong>Experience Required:</strong>{" "}
            {dogData.experience_required ? "Yes" : "No"}
          </p>
          <p>
            <strong>Fencing Needed:</strong> {dogData.fencing} feet
          </p>
          <p>
            <strong>Garden Needed:</strong> {dogData.garden ? "Yes" : "No"}
          </p>
          <p>
            <strong>Living Space Size:</strong> {dogData.living_space_size}
          </p>
          <p>
            <strong>Compatibility with Other Animals:</strong>{" "}
            {dogData.other_animals ? "Yes" : "No"}
          </p>
          <p>
            <strong>Compatibility with Small Animals:</strong>{" "}
            {dogData.small_animal_compatibility ? "Yes" : "No"}
          </p>
          <p>
            <strong>Compatibility with Young Children:</strong>{" "}
            {dogData.young_children_compatibility ? "Yes" : "No"}
          </p>
          <p>
            <strong>Shelter Location:</strong>{" "}
            {dogData.shelter_location_postcode}
          </p>
          <p>
            <strong>Added On:</strong>{" "}
            {new Date(dogData.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      <hr className="divider" />
      <AdoptionCosts id={id} />
    </div>
  );
}
