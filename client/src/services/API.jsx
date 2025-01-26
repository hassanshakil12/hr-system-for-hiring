import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token not found");
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

// Auth Routes

export const register = (userData) => API.post("/auth/register", userData);
export const userLogin = (userData) => {
  try {
    const response = API.post("/auth/login", userData);
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const userLogout = () => {
  try {
    const response = API.post("/auth/logout", {}, { headers: getAuthHeader() });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const getCurrentUser = () => {
  try {
    const response = API.get("/auth/", { headers: getAuthHeader() });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};
// Candidate Routes
export const getJobs = () => {
  try {
    const response = API.get("/candidate/jobs", { headers: getAuthHeader() });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const getApplications = () => {
  try {
    const response = API.get("/candidate/applications", {
      headers: getAuthHeader(),
    });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};
