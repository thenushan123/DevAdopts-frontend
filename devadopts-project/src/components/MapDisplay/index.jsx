import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '400px',
};
  
const center = {
  lat: 51.527699995992975,
  lng: -0.23240487417789085,
};

export default function MapDisplay({searchedDogs}) {
  const [apiKey, setApiKey] = useState('');
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(()=>{
    async function getAPIKey(){
      try{
        const response = await fetch("http://localhost:3000/maps/reference/");
        const jsonResponse = await response.json()
        setApiKey(jsonResponse.data)
      }
      catch(error)
      {
        console.error(error)
      }
    }
    getAPIKey();
  },[])
  if (!apiKey) {
    return <p>Loading Map...</p>;
  }
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9}>
      {searchedDogs.map((dog) => (
          <Marker
            key={dog.dog_id}
            position={{ lat: Number(dog.latitude), lng: Number(dog.longitude) }}
            label={dog.dog_name}
            onClick={() => setSelectedDog(dog)}
          />
        ))}
        {selectedDog && (
          <InfoWindow
            position={{ lat: Number(selectedDog.latitude), lng: Number(selectedDog.longitude) }}
            onCloseClick={() => setSelectedDog(null)}
          >
            <div>
            <img  style={{width:"75px", height:"75px"}} src={selectedDog.photo} alt={selectedDog.dog_name} />
              <h3>{selectedDog.dog_name}</h3>
              <Link to={`/DogsDisplay/${selectedDog.dog_id}`}>View Details</Link> {/* Navigate to dog details page */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  ); 
}
