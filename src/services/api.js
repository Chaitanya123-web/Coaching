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


// services/api.js hardening
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    // If the component expects a list but gets an object error page, 
    // we return an empty array to prevent the .map() crash.
    if (typeof data === 'string' && data.includes('<!DOCTYPE')) {
      return []; 
    }
    return data;
  },
  (error) => {
    return []; // Return empty array on failure so .map() doesn't crash
  }
);

export default api;