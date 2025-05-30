import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromSession, handleLogout } from "../helper";
import Header from "../components/header";
import "@fontsource/montserrat";
import "@fontsource/roboto/300.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Retrieve the session token from localStorage or sessionStorage
    if (getUserFromSession()) {
      try {
        setUserRole(getUserFromSession().role);
      } catch (error) {
        console.error("Invalid session token", error);
        // Handle invalid token case
      }
    } else {
      // Redirect to login if no token is found
      navigate("/");
    }
  }, [navigate]);
  const handleNavigation = (path) => {
    navigate(path);
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
          Welcome to the Dashboard
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
          }}
        >
          {userRole === "employer"
            ? "Manage your job postings and applications"
            : "Explore job opportunities and manage your applications"}
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          {userRole === "employer" ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      View Job Listings
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Review and manage job postings.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: 2,
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                      onClick={() => handleNavigation("/manage-jobs")}
                    >
                      Manage Job Listings
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">View Applications</Typography>
                    <Typography variant="body2">
                      Review and manage applicants for your postings.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => handleNavigation("/manage-applications")}
                    >
                      Manage Applications
                    </Button>
                  </CardContent>
                </Card>
              </Grid> */}
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Search Jobs
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Browse and filter job opportunities.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: 2,
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                      onClick={() => handleNavigation("/jobs")}
                    >
                      Find Jobs
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      View Applications
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Track your submitted job applications.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: 2,
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                      onClick={() => handleNavigation("/my-applications")}
                    >
                      My Applications
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
    // <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    //     <h1 className="text-2xl font-bold mb-4">Welcome to the Main Page!</h1>
    //     <button
    //         onClick={() => navigate("/")}
    //         className="p-2 bg-red-500 text-white rounded"
    //     >
    //         Logout
    //     </button>
    // </div>
  );
};

export default MainPage;
