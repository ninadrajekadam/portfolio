import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// auth token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// login api
export const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// user profile
export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// Skills CRUD operations
export const getSkills = async () => {
  const { data } = await api.get("/skills/getAllSkills");
  return data;
};

export const addSkill = async (formData) => {
  const { data } = await api.post("/skills/addSkill", formData);
  return data;
};

export const updateSkill = async (id, formData) => {
  const { data } = await api.put(`/skills/updateSkill/${id}`, formData);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await api.delete(`/skills/deleteSkill/${id}`);
  return data;
};

// Experience CRUD operations
export const getExperience = async () => {
  const { data } = await api.get("/experience/getAllExperience");
  return data;
};

export const addExperience = async (experienceData) => {
  const { data } = await api.post("/experience/addExperience", experienceData);
  return data;
};

export const updateExperience = async (id, experienceData) => {
  const { data } = await api.put(`/experience/updateExperience/${id}`, experienceData);
  return data;
};

export const deleteExperience = async (id) => {
  const { data } = await api.delete(`/experience/deleteExperience/${id}`);
  return data;
};

// Projects CRUD operations
export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const addProject = async (projectData) => {
  const { data } = await api.post("/projects", projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await api.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

export default api;