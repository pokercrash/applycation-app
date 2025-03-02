import axios from "axios";
import { handleLogin } from "./helper";
import { Password } from "@mui/icons-material";

const API_URL = "https://api.com";

export const registerUser = async (userData) => {
  try {
    //const response = await axios.post(`${API_URL}/register`, userData);
    // handleLogin(response.data);
    const credentials = {
      username: "testing@test.com",
      role: "employer",
      // role: 'employee'
    };

    // const credentials = {
    //   username: userData.email,
    //   role: userData.role,
    //   resume: userData.file,
    //   businessUen: userData.businessUen,
    //   businessName: userData.businessName
    // };

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
      role: "employer",
      //    role: 'employee'
    };
    // const credentials = {
    //   username: userData.email,
    //   password: userData.password
    // };

    handleLogin(credentials);
    return true;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getJobs = async () => {
  try {
    const response = await axios.post(`${API_URL}/getJobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export const getJobsById = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/getJobs`, id);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobsbyid:", error);
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

export const deleteJob = async (id) => {
  try {
    try {
      const response = await axios.post(`${API_URL}/deleteJob`, id);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  } catch (error) {
    console.error("Error saving job:", error);
  }
};

export const getApplicationsByJobId = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/getApplicationsByJobId`, id);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};

export const downloadResumeByApplicationId = async (id) => {
  try {
    const response = await axios.post(
      `${API_URL}/getResumeByApplicationId`,
      id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching resume:", error);
  }
};

export const approveApplication = async (id) => {
  try {
    try {
      const response = await axios.post(`${API_URL}/approveApplication`, id);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  } catch (error) {
    console.error("Error saving job:", error);
  }
};
