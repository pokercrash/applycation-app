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
import { registerUser } from "../api"; // Import the registerUser function

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }
    const userData = {
      name,
      email,
      password,
      selectedOption,
    };

    setLoading(true);
    setError("");

    try {
      const result = await registerUser(userData);
      console.log("Registration success:", result);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err || "Something went wrong.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
    console.log("User registered:", { name, email, password, selectedOption });
    alert("Registration successful!");
    navigate("/");
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
          <Typography variant="h4" textAlign="center" gutterBottom>
            Register
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Choose an Option</InputLabel>
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              label="Choose an Option"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            disabled={loading}
            sx={{ padding: "10px 0", fontSize: "16px" }}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="body2">
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
