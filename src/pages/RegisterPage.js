import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "@fontsource/montserrat";
import "@fontsource/roboto/300.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessUen, setBusinessUen] = useState("");
  const [emailError, setEmailError] = useState("");
  const [role, setRole] = useState("job_seeker");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!role) {
      alert("Please select an option");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: role,
      businessName: businessName,
      businessUen: businessUen,
    };

    setLoading(true);
    setError("");

    try {
      const result = await registerUser(userData);
      console.log("Registration success:", result);
      alert("Registration successful!");
      navigate("/main");
    } catch (err) {
      setError(err, "Something went wrong.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check if all fields are filled correctly
  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    role &&
    !emailError &&
    (role === "job_seeker" || (businessName && businessUen));
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
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Register
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
            >
              Choose an Option
            </InputLabel>
            <Select
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Choose an Option"
            >
              <MenuItem
                value="job_seeker"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                }}
              >
                Employee
              </MenuItem>
              <MenuItem
                value="employer"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                }}
              >
                Employer
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {role === "employer" && (
          <Grid item xs={12}>
            <TextField
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
              fullWidth
              label="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              variant="outlined"
              required
            />
          </Grid>
        )}
        {role === "employer" && (
          <Grid item xs={12}>
            <TextField
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
              }}
              fullWidth
              label="Business Uen"
              value={businessUen}
              onChange={(e) => setBusinessUen(e.target.value)}
              variant="outlined"
              required
            />
          </Grid>
        )}
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
          <TextField
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            disabled={!isFormValid || loading} // Disable button if form is not valid or loading
            sx={{
              padding: "10px 0",
              fontSize: "16px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
          >
            Already have an account?{" "}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
