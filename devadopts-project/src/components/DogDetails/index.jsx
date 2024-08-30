import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

export default function DogDetails() {
    const [dogData, setDogData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function searchAPI() {
            try{
                const response = await fetch(`http://localhost:3000/dogs/${parseInt(id)}`);
                const rawData = await response.json();
                const data = rawData.data;
                console.log(data);
                setDogData(data);
            }
            catch(err){
                console.error("Error fetching dog data:", err);
            }
        }
        searchAPI();
    }, []);
    
  if (!dogData) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className="dog-details-container">
      <h1>{dogData.dog_name}</h1>
      <div className="dog-profile">
        <img  style={{width:"300px", height:"300px", float: 'left', marginRight: '20px'}} src={dogData.photo} alt={dogData.dog_name} />
        <div className="dog-info-grid">
          <div className="dog-info-column">
            <p><strong>Breed:</strong> {dogData.breed}</p>
            <p><strong>Age:</strong> {dogData.age} years</p>
            <p><strong>Gender:</strong> {dogData.gender}</p>
            <p><strong>Color:</strong> {dogData.colour}</p>
            <p><strong>Size:</strong> {dogData.size}</p>
            <p><strong>Activity Levels:</strong> {dogData.activity_levels}</p>
            <p><strong>Allergenic Level:</strong> {dogData.allergenic}</p>
            <p><strong>Adopted:</strong> {dogData.adopted ? "Yes" : "No"}</p>
          </div>
          <div className="dog-info-column">
            <p><strong>Experience Required:</strong> {dogData.experience_required ? "Yes" : "No"}</p>
            <p><strong>Fencing Needed:</strong> {dogData.fencing} feet</p>
            <p><strong>Garden Needed:</strong> {dogData.garden ? "Yes" : "No"}</p>
            <p><strong>Living Space Size:</strong> {dogData.living_space_size}</p>
            <p><strong>Compatibility with Other Animals:</strong> {dogData.other_animals ? "Yes" : "No"}</p>
            <p><strong>Compatibility with Small Animals:</strong> {dogData.small_animal_compatibility ? "Yes" : "No"}</p>
            <p><strong>Compatibility with Young Children:</strong> {dogData.young_children_compatibility ? "Yes" : "No"}</p>
            <p><strong>Shelter Location:</strong> {dogData.shelter_location_postcode}</p>
            <p><strong>Added On:</strong> {new Date(dogData.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
