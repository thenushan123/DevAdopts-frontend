import React from "react";
import { describe, it, expect, beforeEach, afterEach} from 'vitest';
import { screen, render, cleanup} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Register from '.';
import { BrowserRouter } from "react-router-dom";
// import { userProfileContext, UserProvider } from "../../contexts/UserContext";
// jest.mock('../../contexts/UserContext', () => ({
//     userProfileContext: jest.fn(),
//   }));

describe.skip("Register component",()=>{
    // const mockSetLoading = jest.fn();

    // beforeEach(() => {
    // require('../../contexts/UserContext').userProfileContext.mockReturnValue({
    //     loading: false,  // Set to true or false as needed for different test scenarios
    //     setLoading: mockSetLoading,
    //   });
    // });

    const setup = () => {
        render(
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        );
      };
    afterEach(()=>{
        cleanup();
    })
    it("Displays all the input boxes on page render", ()=>{
        setup();
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();

        const firstName = screen.getByPlaceholderText('First Name')
        expect(firstName).toBeInTheDocument();

        const lastName = screen.getByPlaceholderText('Last Name')
        expect(lastName).toBeInTheDocument();

        const email = screen.getByPlaceholderText('Email')
        expect(email).toBeInTheDocument();

        const password = screen.getByPlaceholderText('Password')
        expect(password).toBeInTheDocument();

        const retypePassword = screen.getByPlaceholderText('Retype your password')
        expect(retypePassword).toBeInTheDocument();

        const postcode = screen.getByPlaceholderText('Postcode')
        expect(postcode).toBeInTheDocument();
    })
    it("Displays a submit button on page render", ()=>{
        setup();
        const registerButton= screen.getByRole('button', { name: /register/i });
        expect(registerButton).toBeInTheDocument();
    })
    it("Displays a paragraph with link to login", ()=>{
        setup();
        const para = screen.getByText(/Already a user\?/i);
        expect(para).toBeInTheDocument();

        const link = screen.getByText(/Login/i);
        expect(link).toBeInTheDocument();
    })
    it("Displays an error when passwords donot match", async ()=>{
        setup();
        const user = userEvent.setup();

        const passwordInput = screen.getByPlaceholderText("Password");
        const repeatPasswordInput = screen.getByPlaceholderText("Retype your password");
        
        await user.type(passwordInput, 'password123');
        await user.type(repeatPasswordInput, 'differentPass');

        await user.click(screen.getByText('Register'));
    
        // Expect an error message to appear
        expect(screen.getByText('Passwords donot match!')).toBeInTheDocument();
  });
})