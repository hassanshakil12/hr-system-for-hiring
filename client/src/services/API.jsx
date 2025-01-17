import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const getAuthHeader = (req, res) => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `brearer ${token}` }
    : alert("token not found");
};

// Auth Routes

export const register = (userData) => API.post("/v1/auth/register", userData);
export const userLogin = (userData) => API.post("/v1/auth/login", userData);
