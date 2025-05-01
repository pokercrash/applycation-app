import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
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
import { format } from "date-fns";
import countryList from "react-select-country-list";
import "@fontsource/montserrat"; 
import "@fontsource/roboto/300.css"; 

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
  const [status, setStatus] = useState("");

  const options = useMemo(() => countryList().getData(), []);

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
      const response = await getJobsById(id);
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

  const clickDashboard = () => {
    navigate("/main");
  };

  const clickLogout = () => {
    handleLogout();
    navigate("/");
  };

  const downloadResumeById = async (application) => {
    try {
      const response = await downloadResumeByApplicationId(application._id);

      if (!response || !response.data) {
        throw new Error("No file data received");
      }

      const blob = response.data;
      const contentType = response.headers["content-type"];
      const disposition = response.headers["content-disposition"];
      const fileName = disposition
        ? disposition.split("filename=")[1]?.replace(/['"]/g, "")
        : `${application.email}.${
            getExtensionFromMimeType(contentType) || "file"
          }`;

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(blobUrl);
      console.log(response);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  const getExtensionFromMimeType = (mimeType) => {
    const mimeToExtension = {
      "application/pdf": "pdf",
      "image/jpeg": "jpg",
      "image/png": "png",
      "text/plain": "txt",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
    };
    return mimeToExtension[mimeType];
  };

  const handleApproveApplication = async (obj) => {
    const params = {
      id: obj._id,
      status: obj.status,
    };
    const response = await approveApplication(params);
    if (response.status === 200 || response.status === 201) {
      fetchApplications();
      alert("Application Approved Successfully");
    } else {
      alert("Application Approved Failed");
    }
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
          Manage Applications
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
          }}
        >
          {jobData.title} ({jobData.jobType}) -&nbsp;
          {options.find((option) => option.value === jobData.location)?.label ||
            jobData.location}
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
                    <Typography variant="h6">
                      Name: {application.applicantName}
                    </Typography>
                    <Typography variant="h6">
                      Email: {application.email}
                    </Typography>
                    <Typography variant="h6">
                      Applied at:{" "}
                      {format(new Date(application.appliedAt), "dd MMM yyyy")}
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => downloadResumeById(application)}
                        sx={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Download Resume
                      </Button>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2, marginTop: 2 }}
                      >
                        <InputLabel
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          Application Status
                        </InputLabel>
                        <Select
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                          }}
                          value={application.status}
                          onChange={(e) =>
                            setApplications((prevApplications) =>
                              prevApplications.map((app) =>
                                app._id === application._id
                                  ? { ...app, status: e.target.value }
                                  : app
                              )
                            )
                          }
                          label="Choose an Option"
                        >
                          <MenuItem
                            value="pending"
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                            }}
                          >
                            Pending
                          </MenuItem>
                          <MenuItem
                            value="reviewed"
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                            }}
                          >
                            Reviewed
                          </MenuItem>
                          <MenuItem
                            value="accepted"
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                            }}
                          >
                            Accepted
                          </MenuItem>
                          <MenuItem
                            value="rejected"
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                            }}
                          >
                            Rejected
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleApproveApplication(application)}
                        sx={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Update Status
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
                No applications found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ManageApplications;
