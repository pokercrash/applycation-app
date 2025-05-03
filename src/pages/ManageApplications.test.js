import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ManageApplications from "./ManageApplications";
import { getUserFromSession, handleLogout } from "../helper";
import { getJobsById, getApplicationsByJobId, downloadResumeByApplicationId, approveApplication } from "../api";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

// Mock helper functions and API calls
jest.mock("../helper", () => ({
  getUserFromSession: jest.fn(),
  handleLogout: jest.fn(),
}));

jest.mock("../api", () => ({
  getJobsById: jest.fn(),
  getApplicationsByJobId: jest.fn(),
  downloadResumeByApplicationId: jest.fn(),
  approveApplication: jest.fn(),
}));

describe("ManageApplications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays no applications message when no applications are available", async () => {
    // Mock API responses
    const mockJobData = {
      title: "Software Engineer",
      location: "USA",
      description: "A great job for a great engineer",
      salary: "$100,000",
      jobType: "Full-time",
    };

    getJobsById.mockResolvedValue({ data: mockJobData });
    getApplicationsByJobId.mockResolvedValue([]); // No applications
    getUserFromSession.mockReturnValue(true); // Simulate logged-in user

    render(
      <MemoryRouter initialEntries={["/manage-applications/1"]}>
        <ManageApplications />
      </MemoryRouter>
    );

    // Check if "No applications found" is displayed
    expect(screen.getByText(/No applications found/i)).toBeInTheDocument();
  });


  test("logs out successfully", async () => {
    // Mock functions
    getUserFromSession.mockReturnValue(true);
    handleLogout.mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/manage-applications/1"]}>
        <ManageApplications />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /Logout/i });

    fireEvent.click(logoutButton);

    // Ensure logout function is called
    await waitFor(() => expect(handleLogout).toHaveBeenCalled());
  });
});
