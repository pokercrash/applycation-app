import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ViewJob from "./ViewJob";
import { getUserFromSession, handleLogout } from "../helper";
import { searchJobs, submitApplication } from "../api";

jest.mock("../helper", () => ({
  getUserFromSession: jest.fn(),
  handleLogout: jest.fn(),
}));

jest.mock("../api", () => ({
  searchJobs: jest.fn(),
  submitApplication: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

jest.mock("../components/header", () => (props) => (
  <div>
    <button onClick={props.onLogout}>Logout</button>
    <button onClick={props.onDashboard}>Dashboard</button>
  </div>
));

describe("ViewJob Component", () => {
  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and displays job listings", async () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    const mockJobs = [
      { _id: "1", title: "Software Engineer", location: "Remote", description: "Develop software", salary: "$100k", jobType: "Full-time" },
      { _id: "2", title: "Product Manager", location: "Onsite", description: "Manage products", salary: "$120k", jobType: "Part-time" },
    ];
    searchJobs.mockResolvedValueOnce(mockJobs);

    render(
      <Router>
        <ViewJob />
      </Router>
    );

    expect(await screen.findByText(/Software Engineer/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product Manager/i)).toBeInTheDocument();
  });

  test("filters job listings based on search parameters", async () => {
    getUserFromSession.mockReturnValue("dummy-session-token");
    const mockJobs = [
      { _id: "1", title: "Software Engineer", location: "Remote", description: "Develop software", salary: "$100k", jobType: "Full-time" },
    ];
    searchJobs.mockResolvedValueOnce(mockJobs);

    render(
      <Router>
        <ViewJob />
      </Router>
    );

    const locationInput = screen.getByLabelText(/Location/i);
    fireEvent.change(locationInput, { target: { value: "Remote" } });

    expect(await screen.findByText(/Software Engineer/i)).toBeInTheDocument();
  });
});
