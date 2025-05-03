import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "./RegisterPage";
import { registerUser } from "../api";
import { BrowserRouter as Router } from "react-router-dom";

// Mock API call
jest.mock("../api", () => ({
  registerUser: jest.fn(),
}));

describe("RegisterPage", () => {

  it("disables the sign up button when the form is invalid", () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    expect(submitButton).toBeDisabled(); // Initially disabled

    // Fill form with invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalidEmail" },
    });

    expect(submitButton).toBeDisabled(); // Button still disabled due to invalid email

    // Fill in valid email
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "valid@example.com" },
    });

    expect(submitButton).toBeDisabled(); // Button still disabled because other fields are not filled
  });
});
