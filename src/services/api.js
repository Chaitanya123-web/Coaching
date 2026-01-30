import axios from "axios";

const api = axios.create({
  // Fallback to empty string to prevent undefined errors during mapping
  baseURL: import.meta.env.VITE_API_URL || "",
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
  (response) => response.data,
  (error) => {
   
    console.error("API Error Response:", error.response);
    
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(message);
  }
);

export default api;