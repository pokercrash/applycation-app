import { jwtDecode } from "jwt-decode";

export const handleLogin = (credentials) => {
  // employer
  //const temp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldzEiLCJyb2xlIjoiZW1wbG95ZXIiLCJzdWIiOiJuZXcxIiwiZXhwIjoxNzQ2MzI5MzQ4LCJuYmYiOjE3NDYwNzAxNDgsImlhdCI6MTc0NjA3MDE0OH0.X3pMmY6ZpEHoG9XD-OEw5orwFG9SGtqCWou4ixPEGgc";
  // jobseeker
  const temp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldzIiLCJyb2xlIjoiam9ic2Vla2VyIiwic3ViIjoibmV3MiIsImV4cCI6MTc0NjMyOTMyNiwibmJmIjoxNzQ2MDcwMTI2LCJpYXQiOjE3NDYwNzAxMjZ9.BCDHnXRNj135hGzFldbH0tZ-O6LLOVoKqzQ6W7ykR-U";
  sessionStorage.setItem("jwtToken", temp);
};

export const getUserFromSession = () => {
  const token = getTokenFromSession();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken || null;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
};

export const getTokenFromSession = () => {
  return sessionStorage.getItem("jwtToken");
};

export const handleLogout = () => {
  sessionStorage.removeItem("jwtToken");
};

export const applicationServiceUrl =
  "http://uat-jb-applications-service-alb-11653197.ap-southeast-1.elb.amazonaws.com/";
export const listingServiceUrl =
  "http://uat-jb-listing-service-alb-892159180.ap-southeast-1.elb.amazonaws.com/";
export const authServiceUrl =
  "http://uat-jb-auth-service-alb-956836057.ap-southeast-1.elb.amazonaws.com/";

export const defaultApi = "v1/api";