// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '.';
import { vi } from 'vitest';
import { useProfileContext } from '../../contexts/UserContext';

// Mock useProfileContext hook
vi.mock('../../contexts/UserContext', () => ({
  useProfileContext: vi.fn(),
}));

// Mock the `navigate` function
const mockNavigate = vi.fn();

// Mock useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  const mockSetLoading = vi.fn();
  const mockSetToken = vi.fn();
  const mockContextValue = {
    loading: false,
    setLoading: mockSetLoading,
    setToken: mockSetToken,
  };

  beforeEach(() => {
    useProfileContext.mockReturnValue(mockContextValue);
    mockNavigate.mockClear();
    mockSetLoading.mockClear();
    mockSetToken.mockClear();
  });

  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits the form and displays loading spinner', async () => {
    // Mock the fetch function to simulate a successful login
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ token: 'mockToken' }),
      })
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Ensure loading spinner is displayed
    expect(mockSetLoading).toHaveBeenCalledWith(true);

    // Wait for navigation to occur after successful login
    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('mockToken');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    // Clean up mock fetch
    global.fetch.mockRestore();
  });

  test('displays error message on failed login', async () => {
    // Mock the fetch function to simulate a failed login
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 401,
        text: () => Promise.resolve('Login failed. Please check your credentials and try again.'),
      })
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message to be displayed
    expect(await screen.findByText('Incorrect Email or Password')).toBeInTheDocument();

    // Ensure loading spinner is hidden
    expect(mockSetLoading).toHaveBeenCalledWith(false);

    // Clean up mock fetch
    global.fetch.mockRestore();
  });
});
