import React, { useState } from 'react';
import { useDogsDetail } from '../../contexts/DogsContext';

export default function AdoptionCosts({id}) {
    const {dogs} = useDogsDetail();
    const [showInitialCosts, setShowInitialCosts] = useState(false); 
    const [showMonthlyCosts, setShowMonthlyCosts] = useState(false); 
    const [showLongTermCosts, setShowLongTermCosts] = useState(false); 
    console.log('dogs',dogs);

    function displayInitialCosts(){
      setShowInitialCosts(prev => !prev);
  }
    function displayMonthlyCosts(){
      setShowMonthlyCosts(prev=> !prev)
    }
    function displayLongTermCosts(){
      setShowLongTermCosts(prev=> !prev)
    }

    const getDogById = () => {
      if (!dogs || dogs.length === 0) {
        return null; // Return null if no data is available
      }
      return dogs.find((dog) => dog.dog_id === Number(id)); // Find the dog by id
    };
    const dog = getDogById();

    const renderInitialCosts = () => {
      if (dog && dog.InitialAdoption) {
        const { bed_price, collar_leash_price, microchip_price, neutering_price, obedience_classes_price } = dog.InitialAdoption;
        return (
          <div>
            <p>
              <strong>Initial Adoption Costs:</strong> Bed Price: ${bed_price}, Collar & Leash Price: ${collar_leash_price}, Microchip Price: ${microchip_price}, Neutering Price: ${neutering_price}, Obedience Classes Price: ${obedience_classes_price}.
            </p>
          </div>
        );
      }
      return <p>No initial adoption costs available for this dog.</p>;
    };
  
    const renderMonthlyCosts = () => {
      if (dog && dog.MonthlyAdoption) {
        const { calculated_monthly_cost, food_price, pet_insurance_price, vet_price } = dog.MonthlyAdoption;
        return (
          <div>
            <p>
              <strong>Monthly Adoption Costs:</strong> Total Monthly Cost: ${calculated_monthly_cost}, Food Price: ${food_price}, Pet Insurance Price: ${pet_insurance_price}, Veterinary Care Price: ${vet_price}.
            </p>
          </div>
        );
      }
      return <p>No monthly adoption costs available for this dog.</p>;
    };
  
    const renderLongTermCosts = () => {
      if (dog && dog.LongTermAdoption) {
        const { average_medical_cost, calculated_long_term_cost, end_of_life_price } = dog.LongTermAdoption;
        return (
          <div>
            <p>
              <strong>Long-Term Adoption Costs:</strong> Average Medical Cost: ${average_medical_cost}, End of Life Price: ${end_of_life_price}, Calculated Long Term Cost: ${calculated_long_term_cost}.
            </p>
          </div>
        );
      }
    }
  return (
    <>
      <button onClick={displayInitialCosts} >
        {showInitialCosts ? 'Hide Initial Costs' : 'Show Initial Costs'}
      </button>
      <button onClick={displayMonthlyCosts} >
        {showMonthlyCosts? 'Hide Monthly Costs' : 'Show Monthly Costs'}
      </button>
      <button onClick={displayLongTermCosts} >
        {showLongTermCosts ? 'Hide Long Term Costs' : 'Show Long Term Costs'}
      </button>
      {showInitialCosts && renderInitialCosts()}
      {showMonthlyCosts && renderMonthlyCosts()}
      {showLongTermCosts && renderLongTermCosts()}
    </>
  )
}
