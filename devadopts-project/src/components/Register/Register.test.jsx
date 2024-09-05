// Register.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Register from ".";
import { useProfileContext } from "../../contexts/UserContext";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Mocking the useProfileContext to control loading state
vi.mock("../../contexts/UserContext", () => ({
  useProfileContext: vi.fn(),
}));

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span>Loading...</span>,
}));

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useProfileContext.mockReturnValue({
      loading: false,
      setLoading: vi.fn(),
    });
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

  it("renders Register form elements correctly", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Retype your password")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Postcode")).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it("calls setLoading and shows loading indicator during submission", async () => {
    const setLoadingMock = vi.fn();
    useProfileContext.mockReturnValue({
      loading: false,
      setLoading: setLoadingMock,
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Retype your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postcode"), {
      target: { value: "W1A 1AA" },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(setLoadingMock).toHaveBeenCalledWith(true);
    });
  });

  it("shows success message and navigates to login on successful registration", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Retype your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postcode"), {
      target: { value: "W1A 1AA" },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText("Registered successfully.")).toBeInTheDocument();
    });
  });

  it("shows error message on failed registration attempt", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Retype your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postcode"), {
      target: { value: "W1A 1AA" },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(
        screen.getByText("Unsuccessful Registration.")
      ).toBeInTheDocument();
    });
  });
});
