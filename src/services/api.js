import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach jwt token automatically
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

// global response & error handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "something went wrong";
    return Promise.reject(message);
  }
);

export default api;
