import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ViewApplications from "./ViewApplications";
import { getAppliedJobs } from "../api";
import { getUserFromSession, handleLogout } from "../helper";

// Mock dependencies
jest.mock("../api", () => ({
  getAppliedJobs: jest.fn(),
}));

jest.mock("../helper", () => ({
  getUserFromSession: jest.fn(),
  handleLogout: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ViewApplications Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays applied jobs", async () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    const mockJobs = [
      {
        id: 1,
        title: "Software Engineer",
        location: "US",
        description: "Develop software",
        salary: "$100k",
        jobType: "Full-time",
      },
      {
        id: 2,
        title: "Product Manager",
        location: "UK",
        description: "Manage products",
        salary: "$120k",
        jobType: "Contract",
      },
    ];
    getAppliedJobs.mockResolvedValueOnce(mockJobs);

    render(
      <Router>
        <ViewApplications />
      </Router>
    );

    expect(await screen.findByText(/Software Engineer/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product Manager/i)).toBeInTheDocument();
  });

  it("displays 'No applied jobs' when there are no jobs", async () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    getAppliedJobs.mockResolvedValueOnce([]);

    render(
      <Router>
        <ViewApplications />
      </Router>
    );

    expect(await screen.findByText(/No applied jobs/i)).toBeInTheDocument();
  });

  it("navigates to the dashboard when the dashboard button is clicked", () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <Router>
        <ViewApplications />
      </Router>
    );

    const dashboardButton = screen.getByText(/Dashboard/i);
    fireEvent.click(dashboardButton);

    expect(mockNavigate).toHaveBeenCalledWith("/main");
  });

  it("logs out and navigates to login page on logout", () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <Router>
        <ViewApplications />
      </Router>
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(handleLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles API errors gracefully", async () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    getAppliedJobs.mockRejectedValueOnce(new Error("API Error"));

    render(
      <Router>
        <ViewApplications />
      </Router>
    );

    expect(await screen.findByText(/No applied jobs/i)).toBeInTheDocument();
  });
});
