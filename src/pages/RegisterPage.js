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
  FormHelperText
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { registerUser } from "../api"; // Import the registerUser function

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [emailError, setEmailError] = useState(""); // To track email error
  const [selectedOption, setSelectedOption] = useState("Employee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Set the selected file
    setFileError(false); // Reset the error when a file is selected
  };

  const removeFile = () => {
    setFile(null); // Reset the file state to null, effectively removing the file
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(""); // Clear email error if valid
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }
    if (selectedOption === "Employee" && !file) {
      setFileError(true); // Show error if file is not selected
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
      setError(err,  "Something went wrong.");
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
    selectedOption &&
    !emailError &&
    (selectedOption === "Employer" || file); // Only require file if "Employee" is selected
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
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Employer">Employer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          {/* Conditionally render the Upload Resume button and file name */}
          {selectedOption === 'Employee' && (
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ marginTop: -1 }}
              >
                Upload Resume
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
  
              {/* Display the selected file name and remove button */}
              {file && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    Selected file: {file.name}
                  </Typography>
                  <Button
                    variant="text"
                    startIcon={<DeleteIcon />}
                    onClick={removeFile} // Remove the selected file
                  >
                    Remove
                  </Button>
                </Box>
              )}
  
              {fileError && (
                <FormHelperText error>File is required to submit</FormHelperText>
              )}
            </Grid>
          )}<Grid item xs={12}>
          <TextField
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