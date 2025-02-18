import React, { useState, useEffect } from "react";
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
import { saveJob, getJobs } from "../api"; // Import the loginUser function

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salaryRange: "",
    requiredSkills: "",
  });
  const [editingJob, setEditingJob] = useState(null);

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
      setJobs(getJobs());
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleOpenDialog = (job = null) => {
    if (job) {
      setJobData({
        title: job.title,
        description: job.description,
        location: job.location,
        type: job.type,
        salaryRange: job.salaryRange,
        requiredSkills: job.requiredSkills,
      });
      setEditingJob(job);
    } else {
      setJobData({
        title: "",
        description: "",
        location: "",
        type: "",
        salaryRange: "",
        requiredSkills: "",
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
    //console.log(editingJob,jobData)
    saveJob(editingJob, jobData);
    fetchJobs();
    handleCloseDialog();
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
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2">{job.description}</Typography>
                    <Typography variant="body2">{job.location}</Typography>
                    <Typography variant="body2">{job.type}</Typography>
                    <Typography variant="body2">{job.salaryRange}</Typography>
                    <Typography variant="body2">
                      {job.requiredSkills}
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
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
              label="Job Location"
              name="location"
              fullWidth
              value={jobData.location}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Job Type"
              name="type"
              fullWidth
              value={jobData.type}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Salary Range"
              name="salaryRange"
              fullWidth
              value={jobData.salaryRange}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Required Skills"
              name="requiredSkills"
              fullWidth
              value={jobData.requiredSkills}
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
