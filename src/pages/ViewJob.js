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
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { getUserFromSession, handleLogout } from "../helper";
import { searchJobs, submitApplication } from "../api"; // Import the loginUser function
import Header from "../components/header";
import "@fontsource/montserrat";
import "@fontsource/roboto/300.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ViewJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    businessName: "",
    location: "",
    jobType: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      const jobs = await searchJobs();
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

  const handleOpenDialog = async (job) => {
    setCurrentJob(job);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setCurrentJob(null);
    setName("");
    setEmail("");
    setFile(null);
    setOpen(false);
  };

  const handleApplyJob = async () => {
    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    const formData = new FormData();
    formData.append("job", currentJob._id);
    formData.append("applicantName", name);
    formData.append("email", email);
    formData.append("resume", file);

    const response = await submitApplication(formData);
    if (response.status === 200 || response.status === 201) {
      handleCloseDialog();
      setName("");
      setEmail("");
      setFile(null);
      alert("Job Applied Successfully");
    } else {
      setName("");
      setEmail("");
      setFile(null);
      alert("Job Failed");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileError(false);
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
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
          />
          <TextField
            label="Location"
            variant="outlined"
            name="location"
            value={searchParams.location}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
          />
          <TextField
            label="Job Type"
            variant="outlined"
            name="jobType"
            select
            value={searchParams.jobType}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
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
          </TextField>
          <Button
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
            variant="outlined"
            color="primary"
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                businessName: "",
                jobType: "",
                location: ""
              }))
            }
          >
            Clear
          </Button>
        </Box>
        <Grid container spacing={4}>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
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
                      {job.location}
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
                      {job.salary}
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
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 300,
                        }}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenDialog(job)}
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
              <Typography
                variant="body"
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

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle
            sx={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Apply Job
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              maxWidth="sm"
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  error={!!emailError} // Highlight error if present
                  helperText={emailError} // Show error message
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    marginTop: -1,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Upload Resume
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                {/* Display the selected file name and remove button */}
                {file && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        marginRight: 2,
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Selected file: {file.name}
                    </Typography>
                    <Button
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                      variant="text"
                      startIcon={<DeleteIcon />}
                      onClick={removeFile} // Remove the selected file
                    >
                      Remove
                    </Button>
                  </Box>
                )}
                {fileError && (
                  <FormHelperText
                    error
                    sx={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    File is required to submit
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
              onClick={handleCloseDialog}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
              onClick={handleApplyJob}
              color="primary"
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ViewJob;
