import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import the loginUser function

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // Track email error
  const [passwordError, setPasswordError] = useState(""); // Track password error
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear email error if valid
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError(""); // Clear password error if valid
    }

    if (!emailRegex.test(email) || !password) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const credentials = { email, password };
      const result = await loginUser(credentials);
      console.log("Login success:", result);
      if(result)
      {
        navigate("/main");
      }
    } catch (err) {
      setError(err, "Invalid credentials.");
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
          <Typography variant="h2">Applycation</Typography>
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
            error={!!emailError} // Highlight error if present
            helperText={emailError} // Show email error message
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError} // Highlight error if present
            helperText={passwordError} // Show password error message
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
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
        <Grid item xs={12}>
          <Typography variant="h10" sx={{ color: "grey" }}>
            © {new Date().getFullYear()} Wollongang & 2.5 braincells. 🦆 All Rights
            Reserved.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h10" sx={{ color: "grey" }}>
            Last updated{" "}
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
