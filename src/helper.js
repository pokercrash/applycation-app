import { jwtDecode } from "jwt-decode";

export const handleLogin = (credentials) => {
  const temp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldzEiLCJyb2xlIjoiZW1wbG95ZXIiLCJzdWIiOiJuZXcxIiwiZXhwIjoxNzQ1OTk5ODI0LCJuYmYiOjE3NDU3NDA2MjQsImlhdCI6MTc0NTc0MDYyNH0.K5pzJ-kjoDszP4HFFRRF2x0VS-pCo5Bil2By4VN1xmE";
  //const temp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldzIiLCJyb2xlIjoiam9ic2Vla2VyIiwic3ViIjoibmV3MiIsImV4cCI6MTc0NjE5Mjk5OCwibmJmIjoxNzQ1OTMzNzk4LCJpYXQiOjE3NDU5MzM3OTh9.okGynYAq2RBZuXsGxO6jiZxDBmWSgLp5xjXYMqUyWB0";
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