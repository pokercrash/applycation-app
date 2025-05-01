import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";
import { getAppliedJobs } from "../api";
import "@fontsource/montserrat";
import "@fontsource/roboto/300.css";

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
      const response = await getAppliedJobs();
      console.log(response);
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
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          View Submitted Applications
        </Typography>
        <Grid container spacing={4}>
          {appliedJobs?.length > 0 ? (
            appliedJobs.map((appliedJob) => (
              <Grid item xs={12} sm={6} md={4} key={appliedJob.id}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {appliedJob.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {appliedJob.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {appliedJob.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {appliedJob.salary}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {appliedJob.jobType}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
            >
              No applied jobs.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ViewApplications;
