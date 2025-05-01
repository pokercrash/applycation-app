import axios from "axios";
import {
  handleLogin,
  applicationServiceUrl,
  authServiceUrl,
  listingServiceUrl,
  getTokenFromSession,
  defaultApi,
} from "./helper";

export const registerUser = async (userData) => {
  try {
    const params = {
      username: userData.email,
      password: userData.password,
      role: userData.role,
    };
    axios
      //.get(applicationServiceUrl + "health")
      .post(authServiceUrl + "register", params)
      .then((response) => {
        console.log(response.data);
        // const credentials = {
        //   username: "testing@test.com",
        //   //role: "employer",
        //   role: "employer",
        // };
        //handleLogin(response.data);
        return true;
      })
      .catch((err) => {
        console.error("Error:", err.response?.status, err.message);
        return false;
      });
    return false;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (credentials) => {
  const params = {
    username: credentials.email,
    password: credentials.password,
  };

  // credentials = {
  //   username: "testing@test.com",
  //   role: "employee",
  // };
  // handleLogin(credentials);
  // return true;
  try {
    const params = {
      username: "new1",
      password: "new1password",
    };
    const response = await axios.post(
      // authServiceUrl + defaultApi + "/login",
      authServiceUrl + "login",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return false;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//employee search for all jobs (done)
export const searchJobs = async (searchParams) => {
  try {
    const response = await axios.get(listingServiceUrl + defaultApi, {
      headers: {
        Authorization: `Bearer ${getTokenFromSession()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching jobs:", error);
  }
};

//employer find its own jobs (done)
export const getJobs = async () => {
  try {
    const response = await axios.get(
      listingServiceUrl + defaultApi + "/created",
      {
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error getting jobs:", err.response?.status, err.message);
    return null;
  }
};

//employee find their applied jobs
export const getAppliedJobs = async () => {
  try {
    const response = await axios.get(
      applicationServiceUrl + defaultApi + "/created",
      {
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting applied jobs:", error);
  }
};

//employer get the job description of the job they created by the job id (done)
export const getJobsById = async (id) => {
  try {
    const response = await axios.get(
      listingServiceUrl + defaultApi + "/job-listings/" + id,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return await response;
  } catch (error) {
    console.error("Error fetching jobsbyid:", error);
  }
};

//employer create/edit job (done)
export const saveJob = async (editingJob, jobData) => {
  try {
    const params = {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      description: jobData.description,
      salary: jobData.salary,
      jobType: jobData.jobType,
    };

    if (editingJob) {
      try {
        const response = await axios.put(
          listingServiceUrl + defaultApi + "/" + jobData._id,
          params,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromSession()}`,
            },
          }
        );
        return await response;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
    } else {
      try {
        const response = await axios.post(
          listingServiceUrl + defaultApi,
          params,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromSession()}`,
            },
          }
        );
        return await response;
      } catch (error) {
        throw error.response ? error.response.data : error.message;
      }
    }
  } catch (error) {
    console.error("Error saving job:", error);
  }
};

//employee submit application (done)
export const submitApplication = async (applyJob) => {
  try {
    const response = await axios.post(
      applicationServiceUrl + defaultApi,
      applyJob,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return await response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//employer delete job (done)
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(
      listingServiceUrl + defaultApi + "/" + id,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return await response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//employer get applications of the job they posted (done)
export const getApplicationsByJobId = async (id) => {
  try {
    const response = await axios.get(
      applicationServiceUrl + defaultApi + "/job/" + id,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};

//employee can download resume (done)
export const downloadResumeByApplicationId = async (id) => {
  try {
    const response = await axios.get(
      applicationServiceUrl + defaultApi + "/resume/" + id,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching resume:", error);
  }
};

//employee approve application (done)
export const approveApplication = async (obj) => {
  try {
    const params = {
      status: obj.status,
    };
    const response = await axios.patch(
      applicationServiceUrl + defaultApi + "/" + obj.id + "/status",
      params,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromSession()}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
