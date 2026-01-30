import axios from "axios";

const api = axios.create({
  // Forcefully pointing to Render if Env fails
  baseURL: import.meta.env.VITE_API_URL || "https://the-indofrench-ias.onrender.com/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    // Agar Render HTML error bhej raha hai toh khali array bhej do crash rokne ke liye
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE')) {
      return [];
    }
    return response.data;
  },
  (error) => [] // Fallback array on error
);

export default api;