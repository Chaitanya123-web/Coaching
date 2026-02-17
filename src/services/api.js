import axios from "axios";

const api = axios.create({
  baseURL: "/api", 
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
    // HTML response check (Jab backend 404 par index.html bhejta hai)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE')) {
      console.warn("Received HTML instead of JSON. Check API route.");
      return null; 
    }
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Optional: Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

export default api;