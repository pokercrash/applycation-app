import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ManageJobs from "./pages/ManageJobs"
import ManageApplications from "./pages/ManageApplications"
//import "./assets/css/material-kit-react.css"; // Update the path based on your project structure

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage />} />

                <Route path="/manage-jobs" element={<ManageJobs />} />
                <Route path="/manage-applications/:id" element={<ManageApplications />} />
                <Route path="/jobs" element={<MainPage />} />
                <Route path="/my-applications" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default App;
