import axios from "axios";

// Axios instance
export const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Projects
export const getAllProjects = () => API.get("/projects/all");
export const getProjectById = (id) => API.get(`/projects/${id}`);

export const getDeveloperProjects = (devId, token) =>
  API.get(`/projects/developer/${devId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ DELETE
export const deleteProject = (projectId, token) =>
  API.delete(`/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ UPDATE
export const updateProject = (projectId, data, token) =>
  API.put(`/projects/${projectId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
