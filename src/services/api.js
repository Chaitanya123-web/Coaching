import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://the-indofrench-ias.onrender.com/api",
  withCredentials: true,
});

// CRITICAL: Attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE')) {
      return null; // Return null for single objects
    }
    return response.data;
  },
  (error) => {
    console.error("API Error:", error);
    // If it's a 401, clear token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;