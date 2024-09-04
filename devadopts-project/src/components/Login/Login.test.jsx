import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '.';
import { BrowserRouter } from 'react-router-dom';
import { userProfileContext } from '../../contexts/UserContext';
import { vitest } from 'vitest';

// Mock userProfileContext
vitest.mock('../../contexts/UserContext', () => ({
  userProfileContext: jest.fn(),
}));

describe.skip('Login Component', () => {
  // Mock setLoading function
  const mockSetLoading = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock implementation of userProfileContext
    require('../../contexts/UserContext').userProfileContext.mockReturnValue({
      loading: false, // Set to true or false as needed for different test scenarios
      setLoading: mockSetLoading,
    });

    // Mock useNavigate
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
  });

  const setup = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders input fields and button', () => {
    setup();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('allows user to input text in the fields', async () => {
    setup();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    expect(screen.getByPlaceholderText('Email')).toHaveValue('john.doe@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password123');
  });

  test('shows error when email or password is missing', async () => {
    setup();
    const user = userEvent.setup();

    await user.click(screen.getByText('Login'));
    expect(screen.getByText('Email and password are required')).toBeInTheDocument();
  });

  test('shows loading indicator when loading is true', () => {
    // Mock loading to be true for this test case
    require('../../contexts/UserContext').userProfileContext.mockReturnValue({
      loading: true,
      setLoading: mockSetLoading,
    });

    setup();

    // Check that the loading indicator is displayed
    expect(screen.getByText('Logging in')).toBeInTheDocument();
  });

  test('displays error message on failed login', async () => {
    setup();
    const user = userEvent.setup();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        text: () => Promise.resolve('Login failed. Please check your credentials and try again.'),
      })
    );

    await user.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpassword');
    await user.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please check your credentials and try again.')).toBeInTheDocument();
    });

    global.fetch.mockClear();
  });

  test('redirects to home page on successful login', async () => {
    setup();
    const user = userEvent.setup();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ token: 'fake_token', user_id: '1234' }),
      })
    );

    await user.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'correctpassword');
    await user.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(localStorage.getItem('token')).toBe('fake_token');
      expect(localStorage.getItem('userId')).toBe('1234');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    global.fetch.mockClear();
  });
});
