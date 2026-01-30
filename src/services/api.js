import axios from "axios";

const api = axios.create({
  // Fallback to empty string to prevent undefined errors during mapping
  baseURL: "https://the-indofrench-ias.onrender.com/api",
  withCredentials: true, // Crucial for cross-domain requests in production
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => {
   
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      return Promise.reject("Server is waking up. Please refresh in a moment.");
    }
    return response.data;
  },
  (error) => {
    console.error("Production Error:", error.response?.status);
    return Promise.reject(error);
  }
);

export default api;