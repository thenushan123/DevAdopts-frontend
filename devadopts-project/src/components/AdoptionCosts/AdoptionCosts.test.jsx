// AdoptionCosts.test.jsx
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides additional matchers
import AdoptionCosts from '.';
import { afterEach, vi } from 'vitest';
import { useDogsDetail } from '../../contexts/DogsContext';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Mock the useDogsDetail hook
vi.mock('../../contexts/DogsContext', () => ({
  useDogsDetail: vi.fn(),
}));

describe('AdoptionCosts Component', () => {
  const mockDogs = [
    {
      dog_id: 1,
      InitialAdoption: {
        bed_price: 30,
        collar_leash_price: 15,
        microchip_price: 40,
        neutering_price: 100,
        obedience_classes_price: 200,
      },
      MonthlyAdoption: {
        calculated_monthly_cost: 150,
        food_price: 50,
        pet_insurance_price: 30,
        vet_price: 70,
      },
      LongTermAdoption: {
        average_medical_cost: 500,
        end_of_life_price: 1000,
        calculated_long_term_cost: 2000,
      },
    },
  ];

  beforeEach(() => {
    useDogsDetail.mockReturnValue({ dogs: mockDogs });
  });
  afterEach(()=>{
    cleanup();
  })

  test('renders AdoptionCosts component with heading', () => {
    render(<AdoptionCosts id="1" />);

    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
  });

  test('displays buttons and they work to toggle sections', () => {
    render(<AdoptionCosts id="1" />);

    const initialButton = screen.getByText(/Show Initial Costs/i);
    const monthlyButton = screen.getByText(/Show Monthly Costs/i);
    const longTermButton = screen.getByText(/Show Long Term Costs/i);

    expect(initialButton).toBeInTheDocument();
    expect(monthlyButton).toBeInTheDocument();
    expect(longTermButton).toBeInTheDocument();

    // Click to show initial costs
    fireEvent.click(initialButton);
    expect(screen.getByText(/Initial Adoption Costs/i)).toBeInTheDocument();

    // Click to hide initial costs
    fireEvent.click(initialButton);
    expect(screen.queryByText(/Initial Adoption Costs/i)).not.toBeInTheDocument();

    // Click to show monthly costs
    fireEvent.click(monthlyButton);
    expect(screen.getByText(/Monthly Adoption Costs/i)).toBeInTheDocument();

    // Click to hide monthly costs
    fireEvent.click(monthlyButton);
    expect(screen.queryByText(/Monthly Adoption Costs/i)).not.toBeInTheDocument();

    // Click to show long term costs
    fireEvent.click(longTermButton);
    expect(screen.getByText(/Long-Term Adoption Costs/i)).toBeInTheDocument();

    // Click to hide long term costs
    fireEvent.click(longTermButton);
    expect(screen.queryByText(/Long-Term Adoption Costs/i)).not.toBeInTheDocument();
  });

  test('shows correct cost details for each type', () => {
    render(<AdoptionCosts id="1" />);

    // Show initial costs
    fireEvent.click(screen.getByText(/Show Initial Costs/i));
    expect(screen.getByText(/Bed Price: \$30/i)).toBeInTheDocument();
    expect(screen.getByText(/Obedience Classes Price: \$200/i)).toBeInTheDocument();

    // Show monthly costs
    fireEvent.click(screen.getByText(/Show Monthly Costs/i));
    expect(screen.getByText(/Total Monthly Cost: \$150/i)).toBeInTheDocument();
    expect(screen.getByText(/Food Price: \$50/i)).toBeInTheDocument();

    // Show long term costs
    fireEvent.click(screen.getByText(/Show Long Term Costs/i));
    expect(screen.getByText(/Average Medical Cost: \$500/i)).toBeInTheDocument();
    expect(screen.getByText(/End of Life Price: \$1000/i)).toBeInTheDocument();
  });

  test('displays message when no dog is found', () => {
    useDogsDetail.mockReturnValue({ dogs: [] }); // Return empty dogs array for this test
    render(<AdoptionCosts id="999" />);

    expect(screen.getByText(/No adoption costs available for this dog/i)).toBeInTheDocument();
  });
});
