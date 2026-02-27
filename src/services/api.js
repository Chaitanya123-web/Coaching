import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", 
  withCredentials: true,
});

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
      return null; 
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;