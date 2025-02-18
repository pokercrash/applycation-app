import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onLogout, onDashboard }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={onDashboard}>
          Dashboard
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
