import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";

const ViewJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    businessName: "",
    location: "",
    jobType: "",
  });

  useEffect(() => {
    if (!getUserFromSession()) {
      navigate("/");
    } else {
      // Fetch job listings
      fetchJobs();
    }
  }, [navigate]);

  useEffect(() => {
    const { businessName, location, jobType } = searchParams;
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(businessName.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        job.jobType.toLowerCase().includes(jobType.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchParams, jobs]);

  const fetchJobs = async () => {
    try {
      //setJobs(await searchJobs(searchParams));
      setJobs([
        {
          id: 1,
          title: "Software Engineer",
          location: "Canada",
          description: "Develop and maintain web applications.",
          salary: "$120,000/year",
          jobType: "Full-time",
        },
        {
          id: 2,
          title: "Product Manager",
          location: "Singapore",
          description: "Oversee product development lifecycle.",
          salary: "$100,000/year",
          jobType: "Full-time",
        },
      ]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickDashboard = () => {
    navigate("/main");
  };

  const clickLogout = () => {
    handleLogout();
    navigate("/");
  };

  const handleNavigation = (id) => {
    navigate(`/manage-applications/${id}`);
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
          Search Jobs
        </Typography>
        {/* Search Filters */}
        <Box sx={{ display: "flex", gap: 2, marginTop: 2, marginBottom: 4 }}>
          <TextField
            label="Business Name"
            variant="outlined"
            name="businessName"
            value={searchParams.businessName}
            onChange={handleSearchChange}
            fullWidth
          />
          <TextField
            label="Location"
            variant="outlined"
            name="location"
            value={searchParams.location}
            onChange={handleSearchChange}
            fullWidth
          />
          <TextField
            label="Job Type"
            variant="outlined"
            name="jobType"
            select
            value={searchParams.jobType}
            onChange={handleSearchChange}
            fullWidth
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                jobType: "",
              }))
            }
          >
            Clear
          </Button>
        </Box>
        <Grid container spacing={4}>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2">{job.location}</Typography>
                    <Typography variant="body2">{job.description}</Typography>
                    <Typography variant="body2">{job.salary}</Typography>
                    <Typography variant="body2">{job.jobType}</Typography>
                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleNavigation(job.id)}
                      >
                        Apply
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body">No job listings found.</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ViewJob;
