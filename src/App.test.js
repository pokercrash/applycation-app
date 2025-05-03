import React from "react";
import { render, screen } from "@testing-library/react";
import * as Router from "react-router-dom";
import App from "./App";

// Mocking page components
jest.mock("./pages/LoginPage", () => () => <div>Login Page</div>);
jest.mock("./pages/RegisterPage", () => () => <div>Register Page</div>);
jest.mock("./pages/MainPage", () => () => <div>Main Page</div>);
jest.mock("./pages/ManageJobs", () => () => <div>Manage Jobs Page</div>);
jest.mock("./pages/ManageApplications", () => () => <div>Manage Applications Page</div>);
jest.mock("./pages/ViewApplications", () => () => <div>View Applications Page</div>);
jest.mock("./pages/ViewJob", () => () => <div>View Job Page</div>);

describe("App Routing", () => {
  let originalBrowserRouter;

  beforeAll(() => {
    // Mock BrowserRouter with MemoryRouter for testing
    originalBrowserRouter = Router.BrowserRouter;
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/"]}>{children}</Router.MemoryRouter>
    );
  });

  afterAll(() => {
    // Restore BrowserRouter to its original implementation
    Router.BrowserRouter = originalBrowserRouter;
  });

  test("renders LoginPage on '/' route", () => {
    render(<App />);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders RegisterPage on '/register' route", () => {
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/register"]}>{children}</Router.MemoryRouter>
    );
    render(<App />);
    expect(screen.getByText("Register Page")).toBeInTheDocument();
  });

  test("renders MainPage on '/main' route", () => {
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/main"]}>{children}</Router.MemoryRouter>
    );
    render(<App />);
    expect(screen.getByText("Main Page")).toBeInTheDocument();
  });

  test("renders ManageJobs on '/manage-jobs' route", () => {
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/manage-jobs"]}>{children}</Router.MemoryRouter>
    );
    render(<App />);
    expect(screen.getByText("Manage Jobs Page")).toBeInTheDocument();
  });

  test("renders ManageApplications on '/manage-applications/:id' route", () => {
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/manage-applications/123"]}>{children}</Router.MemoryRouter>
    );
    render(<App />);
    expect(screen.getByText("Manage Applications Page")).toBeInTheDocument();
  });

  test("renders ViewJob on '/jobs' route", () => {
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/jobs"]}>{children}</Router.MemoryRouter>
    );
    render(<App />);
    expect(screen.getByText("View Job Page")).toBeInTheDocument();
  });

  test("renders ViewApplications on '/my-applications' route", () => {
    Router.BrowserRouter = ({ children }) => (
      <Router.MemoryRouter initialEntries={["/my-applications"]}>{children}</Router.MemoryRouter>
    );
    render(<App />);
    expect(screen.getByText("View Applications Page")).toBeInTheDocument();
  });
});
