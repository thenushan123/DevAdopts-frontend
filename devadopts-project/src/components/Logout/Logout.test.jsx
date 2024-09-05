// Logout.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Logout from '.';
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

describe('Logout Component', () => {
  const mockSetToken = vi.fn();
  const mockSetUserId = vi.fn();
  const mockSetFavorites = vi.fn();
  const mockContextValue = {
    token: 'mockToken',
    setToken: mockSetToken,
    setUserId: mockSetUserId,
    setFavorites: mockSetFavorites,
  };

  beforeEach(() => {
    useProfileContext.mockReturnValue(mockContextValue);
    mockNavigate.mockClear();
    mockSetToken.mockClear();
    mockSetUserId.mockClear();
    mockSetFavorites.mockClear();

    // Mock localStorage.removeItem
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks(); // Restore all mocks after each test
  });

  test('renders logout button correctly', () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('calls handleLogout on button click', async () => {
    // Mock the fetch function to simulate a successful logout
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    // Click the logout button
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    // Ensure fetch was called with correct options
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_URL}/users/logout`, {
        headers: {
          "Authorization": "Bearer mockToken",
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
      expect(mockSetToken).toHaveBeenCalledWith(null);
      expect(mockSetUserId).toHaveBeenCalledWith(null);
      expect(mockSetFavorites).toHaveBeenCalledWith(null);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    // Clean up mock fetch
    global.fetch.mockRestore();
  });
});
