import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ onLogout, onDashboard, sessionToken }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontFamily: "Montserrat, sans-serif" }}
        >
          Welcome back, {sessionToken.username}
        </Typography>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontFamily: "Montserrat, sans-serif" }}
          onClick={onDashboard}
        >
          🦆 Applycation Dashboard
        </Typography>
        <Button
          color="inherit"
          onClick={onLogout}
          sx={{
            fontFamily: "Montserrat, sans-serif",
            backgroundColor: "#4F959D", 
            "&:hover": {
              backgroundColor: "#98D2C0",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
