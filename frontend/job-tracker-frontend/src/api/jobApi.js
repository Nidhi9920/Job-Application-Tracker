import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

// Helper: get headers with JWT token
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all jobs
export const getAllJobs = () => {
  return axios.get(`${API_URL}/all`, authHeader());
};

// Add a job
export const addJob = (jobData) => {
  return axios.post(`${API_URL}/add`, jobData, authHeader());
};

// Update a job
export const updateJob = (id, jobData) => {
  return axios.put(`${API_URL}/${id}`, jobData, authHeader());
};

// Delete a job
export const deleteJob = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeader());
};
