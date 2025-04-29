import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";
import {
  getJobsById,
  getApplicationsByJobId,
  downloadResumeByApplicationId,
  approveApplication,
} from "../api"; 
import { format } from 'date-fns';

const ManageApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    jobType: "",
  });

  useEffect(() => {
    if (!getUserFromSession()) {
      navigate("/");
    } else {
      // Fetch job listings
      fetchJobs();
      fetchApplications();
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const response = await getJobsById(id)
      setJobData({
        title: response.data.title,
        location: response.data.location,
        description: response.data.description,
        salary: response.data.salary,
        jobType: response.data.jobType,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await getApplicationsByJobId(id);
      console.log(response);
      setApplications(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const clickDashboard = () => {
    navigate("/main");
  };

  const clickLogout = () => {
    handleLogout();
    navigate("/");
  };

  const downloadResumeById = async (id) => {
    try {
      const response = await downloadResumeByApplicationId(id);
      console.log(response);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  const handleApproveApplication = async (id) => {
    approveApplication(id);
  };
  return (
    <>
      <Header
        onLogout={clickLogout}
        onDashboard={clickDashboard}
        sessionToken={getUserFromSession()}
      />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Applications
        </Typography>
        <Typography variant="h6" gutterBottom>
          {jobData.title} ({jobData.jobType}) -&nbsp;
          {jobData.location}
          <br />
          {jobData.description} -&nbsp;
          {jobData.salary}
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 1 }}>
          {applications?.length > 0 ? (
            applications.map((application) => (
              <Grid item xs={12} sm={6} md={4} key={application._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Name: {application.applicantName}</Typography>
                    <Typography variant="h6">Email: {application.email}</Typography>
                    <Typography variant="h6">Applied at: {format(new Date(application.appliedAt), 'dd MMM yyyy')}</Typography>
                    <Typography variant="h6">{application.status}</Typography>
                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => downloadResumeById(application._id)}
                      >
                        Download Resume
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleApproveApplication(application._id)}
                        sx={{ marginLeft: 2 }}
                      >
                        Approve
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No applications found.</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ManageApplications;
