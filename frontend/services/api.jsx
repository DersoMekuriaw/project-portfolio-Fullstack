import axios from "axios";

// Set the base URL to your backend
export const API = axios.create({
  baseURL: "http://localhost:5000/api", // base points to /api
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Project endpoints
// Upload project with FormData

export const createProject = async (formData, token) => {
  const res = await fetch("http://localhost:5000/api/projects/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT manually set Content-Type
    },
    body: formData,
  });

  return res;
};

export const getAllProjects = () => API.get("/projects/all");
export const getProjectById = (id) => API.get(`/projects/${id}`);

export const getDeveloperProjects = (devId, token) =>
  API.get(`/projects/developer/${devId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
