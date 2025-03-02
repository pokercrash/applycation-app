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
      setJobData(await getJobsById(id));
      setJobData({
        title: "Software Engineer",
        location: "CA",
        description: "Develop and maintain web applications.",
        salary: "$120,000/year",
        jobType: "Full-time",
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      setApplications(await getApplicationsByJobId(id));
      setApplications([
        {
          id: 1,
          name: "tom1",
          resume: "download URL1",
        },
        {
          id: 2,
          name: "tom2",
          resume: "download URL2",
        },
        {
          id: 3,
          name: "tom3",
          resume: "download URL3",
        },
      ]);
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
      await downloadResumeByApplicationId(id);
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
          Manage 🐒 Applications
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
              <Grid item xs={12} sm={6} md={4} key={application.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{application.name}</Typography>
                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => downloadResumeById(application.id)}
                      >
                        Download Resume
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleApproveApplication(application.id)}
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
