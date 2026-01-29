import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ⭐ MOST IMPORTANT LINE
});

// attach jwt token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// unwrap response
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(
      error?.response?.data?.message || "Something went wrong"
    );
  }
);

export default api;