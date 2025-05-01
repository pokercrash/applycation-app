import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ onLogout, onDashboard, sessionToken }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontFamily: "Montserrat, sans-serif" }}
          onClick={onDashboard}
        >
          🦆 Applycation Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontFamily: "Montserrat, sans-serif" }}
        >
          {sessionToken.username} | {sessionToken.role}
        </Typography>
        <Button
          color="inherit"
          onClick={onLogout}
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
