import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import the loginUser function

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    console.log(email, password);
    // if (email === "test@test.com" && password === "password") {
    //   navigate("/main");
    // } else {
    //   alert("Invalid credentials");
    // }

    try {
      const credentials = { email, password };
      const result = await loginUser(credentials);
      console.log("Login success:", result);
      alert("Login successful!");
      navigate("/main"); // Redirect to main page after login
    } catch (err) {
      setError(err || "Invalid credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
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
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            fullWidth
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
