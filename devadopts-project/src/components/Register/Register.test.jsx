import React from "react";
import { describe, it, expect, beforeEach, afterEach} from 'vitest';
import { screen, render, cleanup} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Register from '.';
import { BrowserRouter } from "react-router-dom";
import { userProfileContext, UserProvider } from "../../contexts/UserContext";

describe("Register component",()=>{
    beforeEach(()=>{
        render(<BrowserRouter><UserProvider><Register /></UserProvider></BrowserRouter>)
    })
    afterEach(()=>{
        cleanup();
    })
    it("Displays all the input boxes on page render", ()=>{
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
        const registerButton= screen.getByRole('button', { name: /register/i });
        expect(registerButton).toBeInTheDocument();
    })
    it("Displays a paragraph with link to login", ()=>{
        const para = screen.getByText(/Already a user\?/i);
        expect(para).toBeInTheDocument();

        const link = screen.getByText(/Login/i);
        expect(link).toBeInTheDocument();
    })
})