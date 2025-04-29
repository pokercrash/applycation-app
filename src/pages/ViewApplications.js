import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box, 
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";
import {
  downloadResumeByApplicationId,
} from "../api"; 
const ViewApplications = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (!getUserFromSession()) {
      navigate("/");
    } else {
      fetchAppliedApplications();
    }
  }, [navigate]);

  const fetchAppliedApplications = async () => {
    try {
      //setAppliedJobs(await getAppliedJobs());
      setAppliedJobs([
        {
          id: 1,
          title: "Software Engineer",
          location: "CA",
          description: "Develop and maintain web applications.",
          salary: "$120,000/year",
          jobType: "Full-time",
          resume: "download URL1",
        },
        {
          id: 2,
          title: "Product Manager",
          location: "SG",
          description: "Oversee product development lifecycle.",
          salary: "$100,000/year",
          jobType: "Full-time",
          resume: "download URL2",
        },
      ]);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  const downloadResume = async (id) => {
      try {
        await downloadResumeByApplicationId(id);
      } catch (error) {
        console.error("Error downloading resume:", error);
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
          View Submitted Applications
        </Typography>
        <Grid container spacing={4} >
          {appliedJobs?.length > 0 ? (
            appliedJobs.map((appliedJob) => (
              <Grid item xs={12} sm={6} md={4} key={appliedJob.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{appliedJob.title}</Typography>
                    <Typography variant="body2">{appliedJob.location}</Typography>
                    <Typography variant="body2">{appliedJob.description}</Typography>
                    <Typography variant="body2">{appliedJob.salary}</Typography>
                    <Typography variant="body2">{appliedJob.jobType}</Typography>
                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => downloadResume(appliedJobs.id)}
                      >
                        Download Resume
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No applied jobs.</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ViewApplications;
