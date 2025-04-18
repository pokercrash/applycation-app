import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";
import { saveJob, deleteJob } from "../api"; // Import the loginUser function

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    jobType: "",
  });
  const [editingJob, setEditingJob] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption) => {
    setJobData((prevState) => ({
      ...prevState,
      location: selectedOption.value,
    }));
  };

  useEffect(() => {
    if (!getUserFromSession()) {
      navigate("/");
    } else {
      // Fetch job listings
      fetchJobs();
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      //setJobs(await getJobs(employerId));
      setJobs([
        {
          id: 1,
          title: "Software Engineer",
          location: "CA",
          description: "Develop and maintain web applications.",
          salary: "$120,000/year",
          jobType: "Full-time",
        },
        {
          id: 2,
          title: "Product Manager",
          location: "SG",
          description: "Oversee product development lifecycle.",
          salary: "$100,000/year",
          jobType: "Full-time",
        },
      ]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleOpenDialog = (job = null) => {
    if (job) {
      setJobData({
        title: job.title,
        location: job.location,
        description: job.description,
        salary: job.salary,
        jobType: job.jobType,
      });
      setEditingJob(job);
    } else {
      setJobData({
        title: "",
        location: "",
        description: "",
        salary: "",
        jobType: "",
      });
      setEditingJob(null);
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveJob = async () => {
    saveJob(editingJob, jobData);
    fetchJobs();
    handleCloseDialog();
  };

  const handleDeleteJob = async (id) => {
    try {
      deleteJob(id);
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
          Manage Job Listings
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Create New Job
        </Button>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {jobs?.length > 0 ? (
            jobs.map((job) => (
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
                        onClick={() =>
                          handleNavigation(job.id)
                        }
                      >
                        View Applications 
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenDialog(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteJob(job.id)}
                        sx={{ marginLeft: 2 }}
                      >
                        Delete
                      </Button>
                      
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No job listings found.</Typography>
          )}
        </Grid>

        {/* Job Dialog (Create / Edit) */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>
            {editingJob ? "Edit Job" : "Create New Job"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Job Title"
              name="title"
              fullWidth
              value={jobData.title}
              onChange={handleChange}
              sx={{ marginBottom: 2, marginTop: 1 }}
            />
            <Select
              options={options}
              value={options.find(
                (option) => option.value === jobData.location
              )}
              onChange={changeHandler}
              placeholder="Country"
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: 56,
                  padding: "0 2px",
                  borderRadius: "4px",
                  boxShadow: "none",
                  marginBottom: 15,
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 1300,
                }),
              }}
            />
            <TextField
              label="Job Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={jobData.description}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Salary"
              name="salary"
              fullWidth
              value={jobData.salary}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Job Type"
              name="jobType"
              fullWidth
              value={jobData.jobType}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveJob} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ManageJobs;
