import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageJobs from './ManageJobs'; // path to the component
import { getUserFromSession, handleLogout } from '../helper'; // mock helper functions
import { getJobs, saveJob, deleteJob } from '../api'; // mock api functions
import { BrowserRouter as Router } from 'react-router-dom';

// Mock external modules
jest.mock('../helper', () => ({
  getUserFromSession: jest.fn(),
  handleLogout: jest.fn(),
}));

jest.mock('../api', () => ({
  getJobs: jest.fn(),
  saveJob: jest.fn(),
  deleteJob: jest.fn(),
}));

describe('ManageJobs Component', () => {
  const mockJobs = [
    {
      _id: '1',
      title: 'Software Engineer',
      location: 'SG',
      description: 'Develop software',
      salary: '5000',
      jobType: 'Full-time',
    },
    {
      _id: '2',
      title: 'Product Manager',
      location: 'US',
      description: 'Manage products',
      salary: '6000',
      jobType: 'Full-time',
    },
  ];

  beforeEach(() => {
    getUserFromSession.mockReturnValue(true); // Simulate logged-in user
    getJobs.mockResolvedValue(mockJobs);
  });

  test('should render the component correctly and fetch jobs', async () => {
    render(
      <Router>
        <ManageJobs />
      </Router>
    );

    // Check if the job titles are displayed
    await waitFor(() => {
      mockJobs.forEach((job) => {
        expect(screen.getByText(job.title)).toBeInTheDocument();
      });
    });

    // Check if the 'Create New Job' button is rendered
    expect(screen.getByText('Create New Job')).toBeInTheDocument();
  });

  test('should open the dialog to create a new job', () => {
    render(
      <Router>
        <ManageJobs />
      </Router>
    );

    // Trigger the click on the 'Create New Job' button
    fireEvent.click(screen.getByText('Create New Job'));

    // Check if the dialog is opened
    expect(screen.getByText('Create New Job')).toBeInTheDocument();
  });
});
