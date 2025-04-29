import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ManageJobs from "./pages/ManageJobs"
import ManageApplications from "./pages/ManageApplications"
import ViewApplications from "./pages/ViewApplications";
import ViewJob from "./pages/ViewJob";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage />} />

                <Route path="/manage-jobs" element={<ManageJobs />} />
                <Route path="/manage-applications/:id" element={<ManageApplications />} />
                <Route path="/jobs" element={<ViewJob />} />
                <Route path="/my-applications" element={<ViewApplications />} />
            </Routes>
        </Router>
    );
}

export default App;
