import React, { useState, useEffect, useMemo } from "react";
import { default as CountrySelect } from "react-select";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";
import { saveJob, deleteJob, getJobs } from "../api"; // Import the loginUser function
import "@fontsource/montserrat"; 
import "@fontsource/roboto/300.css"; 

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState({
    _id: "",
    title: "",
    company: "",
    location: "SG",
    description: "",
    salary: "5000",
    jobType: "Full-time",
  });
  const [editingJob, setEditingJob] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption) => {
    setJobData((prevState) => ({
      ...prevState,
      location: selectedOption.value,
    }));
  };

  const getCompany = async () => {
    const user = await getUserFromSession();
    return await user.sub;
  };

  useEffect(() => {
    if (!getUserFromSession()) {
      navigate("/");
    } else {
      console.log("Fetching Jobs...");
      fetchJobs();
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const jobs = await getJobs();
      if (jobs) {
        setJobs(jobs);
        console.log("Fetched Jobs...");
      } else {
        console.warn("No jobs found or an error occurred.");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleOpenDialog = async (job = null) => {
    const company = await getCompany();
    if (job) {
      setJobData({
        _id: job._id,
        title: job.title,
        company: company,
        location: job.location,
        description: job.description,
        salary: job.salary,
        jobType: job.jobType,
      });
      setEditingJob(job);
    } else {
      setJobData({
        _id: "",
        title: "",
        company: company,
        location: "SG",
        description: "",
        salary: "5000",
        jobType: "Full-time",
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
    const response = await saveJob(editingJob, jobData);
    if (response.status === 200 || response.status === 201) {
      fetchJobs();
      handleCloseDialog();
      if (editingJob) {
        alert("Job Updated Successfully");
      } else {
        alert("Job Created Successfully");
      }
    } else {
      alert("Job Failed");
    }
  };

  const handleDeleteJob = async (id) => {
    const response = await deleteJob(id);
    if (response.status === 200 || response.status === 201) {
      fetchJobs();
      alert("Delete Job Successfully");
    } else {
      alert("Delete Job Failed");
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
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Manage Job Listings
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Create New Job
        </Button>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {jobs?.length > 0 ? (
            jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {job.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {options.find((option) => option.value === job.location)
                        ?.label || job.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {job.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      ${job.salary}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {job.jobType}
                    </Typography>

                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        sx={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleNavigation(job._id)}
                      >
                        View Applications
                      </Button>
                      <br />
                      <br />
                      <Button
                        sx={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenDialog(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteJob(job._id)}
                        sx={{
                          marginLeft: 2,
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                }}
              >
                No job listings found.
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Job Dialog (Create / Edit) */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle
            sx={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {editingJob ? "Edit Job" : "Create New Job"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Job Title"
              name="title"
              fullWidth
              value={jobData.title}
              onChange={handleChange}
              sx={{
                marginBottom: 2,
                marginTop: 1,
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
            />
            <CountrySelect
              options={options}
              value={options.find(
                (option) => option.value === jobData.location
              )}
              onChange={changeHandler}
              placeholder="Country"
              styles={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
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
              sx={{
                marginBottom: 2,
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
            />
            <TextField
              label="Salary"
              name="salary"
              fullWidth
              value={jobData.salary}
              onChange={handleChange}
              sx={{
                marginBottom: 2,
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                }}
              >
                Choose a Job Type
              </InputLabel>
              <Select
                value={jobData.jobType}
                onChange={(event) =>
                  setJobData((prevData) => ({
                    ...prevData,
                    jobType: event.target.value,
                  }))
                }
                label="Choose an Option"
              >
                <MenuItem
                  value="Full-time"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Full-time
                </MenuItem>
                <MenuItem
                  value="Part-time"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Part-time
                </MenuItem>
                <MenuItem
                  value="Contract"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Contract
                </MenuItem>
                <MenuItem
                  value="Internship"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Internship
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="secondary"
              sx={{
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveJob}
              color="primary"
              sx={{
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ManageJobs;
