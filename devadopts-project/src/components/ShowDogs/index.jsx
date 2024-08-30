import React, {useEffect, useState} from 'react';
import { useDogsDetail } from '../../contexts/DogsContext';
import DogDetailCard from '../DogDetailCard';
import './ShowDogs.css';

export default function ShowDogs() {
    const { dogs, setDogs} = useDogsDetail();
    const [postcode, setPostcode] = useState('');
    const [selectedBreed, setSelectedBreed] = useState("");
    const [errorPostCode, setErrorPostCode] = useState(false);
    const [searchedDogs, setSearchedDogs] = useState(dogs)

    useEffect(() => {
        async function displayDogsInformation() {
            const response = await fetch("http://localhost:3000/dogs");
            const rawData = await response.json();
            const data = rawData.data
            setDogs(data);
            setSearchedDogs(data);
        }
        displayDogsInformation();
      
      }, []);
      const validatePostcode =()=>{
        const ukPostcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
        if (!ukPostcodePattern.test(postcode)) {
            setErrorPostCode(true)
            return false;
          } 
        else  {
            setErrorPostCode(false); 
            return true;
        }
      };
      const handleSearch = () =>{
        const selectedBreedLowerCase = selectedBreed.toLowerCase();
        if(postcode === "" || validatePostcode())
        {
          const filteredDogs = dogs.filter((dog) => {
            return (
              (postcode === '' || dog.shelter_location_postcode === postcode) && 
              (selectedBreed === '' || dog.breed.toLowerCase().includes(selectedBreedLowerCase))
            );
          });
          setSearchedDogs(filteredDogs)
        }
      }
    
  return (
  <>
    <h2>Find a dog to adopt</h2>
    <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter your postcode"
        />
        <span>{errorPostCode && <p style={{ color: 'red' }}>Please enter correct postcode</p>}</span>
        <div className="dropdown">
          <p>Select a Dog Breed</p>
          <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
            <option value="">-- Select a breed --</option>
            <option value="Labrador">Labrador</option>
            <option value="Pomeranian">Pomeranian</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Siberian Husky">Siberian Husky</option>
          </select>
        </div>
        <button className="search-dogs" onClick={handleSearch}>Search</button>
      </div>
      
    <div className='dogs-list'>
        {searchedDogs.map((dog) => (
            <DogDetailCard key={dog.dog_id} dog={dog} />
            ))}
    </div>
  </>
  );
}
