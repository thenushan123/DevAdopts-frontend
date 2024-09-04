import React from "react";
import { describe, it, expect, beforeEach, afterEach} from 'vitest';
import { screen, render, cleanup} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import AdoptionCosts from "."; 

describe("AdoptionCosts", ()=>{
    afterEach(()=>{
        cleanup();
    })
    it("Displays 3 buttons for costs",()=>{
        render(<AdoptionCosts id="1" />); 
        const initialCostsButton = screen.getByText('Show Initial Costs');
        const monthlyCostsButton = screen.getByText('Show Monthly Costs');
        const longTermCostsButton = screen.getByText('Show Long Term Costs');

        expect(initialCostsButton).toBeInTheDocument();
        expect(monthlyCostsButton).toBeInTheDocument();
        expect(longTermCostsButton).toBeInTheDocument();
    })
    // it("Changes location when nav link is clicked",async ()=>{
    //     const navLink = screen.getByText('Getter');
    //     expect(window.location.href).not.toContain("/getter")
    //     await userEvent.click(navLink);
    //     expect(window.location.href).toContain("/getter");
    // })
})  