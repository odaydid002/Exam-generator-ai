import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (window.__accessToken) {
    config.headers.Authorization = `Bearer ${window.__accessToken}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const res = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        window.__accessToken = res.data.accessToken;
        error.config.headers.Authorization = `Bearer ${window.__accessToken}`;
        return api(error.config);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
