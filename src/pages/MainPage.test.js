import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import { BrowserRouter as Router } from 'react-router-dom';
import * as helper from '../helper';

// Mocking the helper functions
jest.mock('../helper', () => ({
  getUserFromSession: jest.fn(),
  handleLogout: jest.fn(),
}));

// Create a mock navigate function
const mockNavigate = jest.fn();

// Mock useNavigate to return our mock function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Utility to wrap the component with Router for navigation
const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('MainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear(); // Clear the mock navigate before each test
  });

  test('renders the page and displays the welcome message', () => {
    helper.getUserFromSession.mockReturnValue({ role: 'employer' });
    renderWithRouter(<MainPage />);
    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
  });

  test('renders the correct UI for employer role', () => {
    helper.getUserFromSession.mockReturnValue({ role: 'employer' });
    renderWithRouter(<MainPage />);
    expect(screen.getByText(/Manage your job postings and applications/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Job Listings/i)).toBeInTheDocument();
  });

  test('renders the correct UI for job seeker role', () => {
    helper.getUserFromSession.mockReturnValue({ role: 'job_seeker' });
    renderWithRouter(<MainPage />);
    expect(screen.getByText(/Explore job opportunities and manage your applications/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/My Applications/i)).toBeInTheDocument();
  });

  test('navigates to the correct path on button click (for employer)', () => {
    helper.getUserFromSession.mockReturnValue({ role: 'employer' });
    renderWithRouter(<MainPage />);
    fireEvent.click(screen.getByText(/Manage Job Listings/i));
    expect(mockNavigate).toHaveBeenCalledWith('/manage-jobs');
  });

  test('navigates to the correct path on button click (for job seeker)', () => {
    helper.getUserFromSession.mockReturnValue({ role: 'job_seeker' });
    renderWithRouter(<MainPage />);
    fireEvent.click(screen.getByText(/Find Jobs/i));
    expect(mockNavigate).toHaveBeenCalledWith('/jobs');
  });

//   test('redirects to login if no session token exists', () => {
//     // Mock window.location for this test as useNavigate won't be called directly
//     delete window.location;
//     window.location = { assign: jest.fn(), pathname: '' };

//     helper.getUserFromSession.mockReturnValue(null);
//     renderWithRouter(<MainPage />);
//     expect(window.location.assign).toHaveBeenCalledWith('/');
//   });

  test('calls handleLogout when logout button is clicked', () => {
    helper.getUserFromSession.mockReturnValue({ role: 'employer' });
    renderWithRouter(<MainPage />);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(helper.handleLogout).toHaveBeenCalled();
  });
});