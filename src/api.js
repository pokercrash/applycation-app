import axios from "axios";
import { handleLogin } from "./helper";

const API_URL = "https://api.com";

export const registerUser = async (userData) => {
  try {
    //const response = await axios.post(`${API_URL}/register`, userData);
    // handleLogin(response.data);
    const credentials = {
      username: "testing@test.com",
      token: "abc123",
      role: "employer",
      // role: 'employee'
    };
    handleLogin(credentials);
    return true;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    // const response = await axios.post(`${API_URL}/login`, credentials);
    // handleLogin(response.data);
    const credentials = {
      username: "testing@test.com",
      token: "abc123",
      role: "employer",
      //    role: 'employee'
    };
    handleLogin(credentials);
    return true;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getJobs = async () => {
    try {
        const response = await axios.post(`${API_URL}/getJobs`, );
        return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
export const saveJob = async (editingJob, jobData) => {
  try {
    if (editingJob) {
      // Update job
      try {
        const response = await axios.post(
          `${API_URL}/jobs/${editingJob.id}`,
          jobData
        );
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
    } else {
      // Create new job
      try {
        const response = await axios.post(`${API_URL}/jobs`, jobData);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
    }
  } catch (error) {
    console.error("Error saving job:", error);
  }
};
