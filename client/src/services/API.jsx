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

export const userApplyToJob = (userData) => {
  try {
    const response = API.post(
      `/candidate/apply-for-job/${userData.job}`,
      userData.formData,
      {
        headers: getAuthHeader(),
      }
    );
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

// Organization Routes
export const getOrganizationJobs = () => {
  try {
    const response = API.get("/organization/jobs", {
      headers: getAuthHeader(),
    });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const createJob = (jobData) => {
  try {
    const response = API.post("/organization/add-job", jobData, {
      headers: getAuthHeader(),
    });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const getJobApplications = () => {
  try {
    const response = API.get("/application/", {
      headers: getAuthHeader(),
    });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const getAllRecruiters = () => {
  try {
    const response = API.get("/hire/", {
      headers: getAuthHeader(),
    });
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const hireRecruiter = (userData) => {
  try {
    const response = API.post(
      "/hire/onboard",
      { userData },
      { headers: getAuthHeader() }
    );
    return response;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};
