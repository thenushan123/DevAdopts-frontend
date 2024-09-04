import React, { useState, useEffect } from 'react';
import { useDogsDetail } from '../../contexts/DogsContext';
import './AdoptionCosts.css';

export default function AdoptionCosts({ id }) {
  const { dogs } = useDogsDetail();
  const [activeCostType, setActiveCostType] = useState(null); // Use a single state to manage active section

  console.log('dogs', dogs);

  const handleButtonClick = (costType) => {
    setActiveCostType(prev => prev === costType ? null : costType); // Toggle section visibility
  };

  const getDogById = () => {
    if (!dogs || dogs.length === 0) {
      return null; // Return null if no data is available
    }
    return dogs.find((dog) => dog.dog_id === Number(id)); // Find the dog by id
  };

  const dog = getDogById();

  const renderCosts = () => {
    if (dog) {
      if (activeCostType === 'initial') {
        const { bed_price, collar_leash_price, microchip_price, neutering_price, obedience_classes_price } = dog.InitialAdoption;
        return (
          <div className="cost-details">
            <p>
              <strong>Initial Adoption Costs:</strong> Bed Price: ${bed_price}, Collar & Leash Price: ${collar_leash_price}, Microchip Price: ${microchip_price}, Neutering Price: ${neutering_price}, Obedience Classes Price: ${obedience_classes_price}.
            </p>
          </div>
        );
      } else if (activeCostType === 'monthly') {
        const { calculated_monthly_cost, food_price, pet_insurance_price, vet_price } = dog.MonthlyAdoption;
        return (
          <div className="cost-details">
            <p>
              <strong>Monthly Adoption Costs:</strong> Total Monthly Cost: ${calculated_monthly_cost}, Food Price: ${food_price}, Pet Insurance Price: ${pet_insurance_price}, Veterinary Care Price: ${vet_price}.
            </p>
          </div>
        );
      } else if (activeCostType === 'longTerm') {
        const { average_medical_cost, calculated_long_term_cost, end_of_life_price } = dog.LongTermAdoption;
        return (
          <div className="cost-details">
            <p>
              <strong>Long-Term Adoption Costs:</strong> Average Medical Cost: ${average_medical_cost}, End of Life Price: ${end_of_life_price}, Calculated Long Term Cost: ${calculated_long_term_cost}.
            </p>
          </div>
        );
      }
    }
    return <p className="cost-details">No adoption costs available for this dog.</p>;
  };

  return (
    <>
      <h3 className='adoption-header'>Adoption Costs</h3>
      <div className="adoption-costs-container">
        <div className="adoption-button-container">
          <button className="adoption-btn" onClick={() => handleButtonClick('initial')}>
            {activeCostType === 'initial' ? 'Hide Initial Costs' : 'Show Initial Costs'}
          </button>
          <button className="adoption-btn" onClick={() => handleButtonClick('monthly')}>
            {activeCostType === 'monthly' ? 'Hide Monthly Costs' : 'Show Monthly Costs'}
          </button>
          <button className="adoption-btn" onClick={() => handleButtonClick('longTerm')}>
            {activeCostType === 'longTerm' ? 'Hide Long Term Costs' : 'Show Long Term Costs'}
          </button>
        </div>
        {renderCosts()}
      </div>
    </>
  );
}
