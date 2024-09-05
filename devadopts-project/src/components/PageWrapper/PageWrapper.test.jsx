// PageWrapper.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PageWrapper from ".";
import { useProfileContext } from "../../contexts/UserContext";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Mock necessary components and hooks
vi.mock("../../contexts/UserContext", () => ({
  useProfileContext: vi.fn(),
}));

vi.mock("../index", () => ({
  Logout: () => <button>Logout</button>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    NavLink: ({ children, to }) => <a href={to}>{children}</a>,
    Outlet: () => <div>Page Content</div>,
  };
});

describe("PageWrapper Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the brand logo and title", () => {
    useProfileContext.mockReturnValue({ token: null }); // Mock the context to return no token (unauthenticated state)

    render(
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    );

    // Check if the logo and title are rendered
    expect(screen.getByAltText("DevAdopts Logo")).toBeInTheDocument();
    expect(screen.getByText("DevAdopts")).toBeInTheDocument();
  });

  it("renders Login and Register links when user is not authenticated", () => {
    useProfileContext.mockReturnValue({ token: null }); // Mock the context to return no token (unauthenticated state)

    render(
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    );

    // Check for Login and Register links
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("renders UserProfile link and Logout button when user is authenticated", () => {
    useProfileContext.mockReturnValue({ token: "mocked-token" }); // Mock the context to return a token (authenticated state)

    render(
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    );

    // Check for UserProfile link and Logout button
    expect(screen.getByText("UserProfile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders About Us and Donate links regardless of authentication", () => {
    useProfileContext.mockReturnValue({ token: null }); // Mock the context to return no token (unauthenticated state)

    render(
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    );

    // Check for About Us and Donate links
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Donate")).toBeInTheDocument();

    // Simulate authenticated state
    useProfileContext.mockReturnValue({ token: "mocked-token" }); // Mock the context to return a token (authenticated state)
    render(
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    );

    const about = screen.queryAllByText("About Us");
    expect(about).toHaveLength(2);

    const donate = screen.queryAllByText("Donate");
    expect(donate).toHaveLength(2);
  });
});
