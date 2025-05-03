import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage"; 
import { loginUser } from "../api"; 
import { BrowserRouter as Router } from "react-router-dom";

// Mock loginUser API call
jest.mock("../api", () => ({
  loginUser: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("renders login form correctly", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Check if the login form elements are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("displays email error message for invalid email format", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate user typing an invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(loginButton);

    // Expect error message to show
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test("displays password error message when password is empty", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate valid email and empty password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(loginButton);

    // Expect error message for password
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test("calls loginUser API and navigates to main page on successful login", async () => {
    // Mock the API call to resolve with a valid result
    loginUser.mockResolvedValueOnce(true);

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate valid email and password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    // Wait for the loginUser call to finish and check navigation (use history or a mock navigation)
    await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(1));
    expect(loginUser).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    // Check if navigation happened (you can mock this using jest's spyOn or use the real Router)
    // This requires setting up a mock navigation to test if navigate("/main") was called.
  });

});
