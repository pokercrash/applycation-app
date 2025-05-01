import React, { useState, useEffect, useMemo} from "react";
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
import countryList from "react-select-country-list";

const ViewApplications = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const options = useMemo(() => countryList().getData(), []);

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
      setAppliedJobs(response);
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
                      {options.find((option) => option.value === appliedJob.location)?.label ||
            appliedJob.location}
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
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                }}
              >
                No applied jobs.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ViewApplications;
