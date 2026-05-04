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

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

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
  const { data } = await api.get("/projects/getAllProjects");
  return data;
};

export const addProject = async (projectData) => {
  const { data } = await api.post("/projects/addProject", projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await api.put(`/projects/updateProject/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/deleteProject/${id}`);
  return data;
};

export const sendMessage = async (messageData) => {
  try {
    const { data } = await api.post("/messages/contact", messageData);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send message" };
  }
};

export const getMessages = async () => {
  const { data } = await api.get("/messages/getMessages");
  return data;
};

export const getUnreadCount = async () => {
  const { data } = await api.get("/messages/unreadCount");
  return data;
};

export const markAsRead = async (id) => {
  const { data } = await api.put(`/messages/read/${id}`);
  return data;
};

export const replyToMessage = async (id, reply) => {
  const { data } = await api.post(`/messages/reply/${id}`, { reply });
  return data;
};

export const deleteMessage = async (id) => {
  const { data } = await api.delete(`/messages/deleteMessage/${id}`);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/profile/getProfile");
  return data;
};

export const updateProfile = async (formData) => {
  try {
    const { data } = await api.put("/profile/update", formData);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};

export const saveProfile = async (formData) => {
  const { data } = await api.post("/profile/save", formData);
  return data;
};

export default api;