import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility to set Authorization header
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Initialize from localStorage if available
const storedToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
if (storedToken) setAuthToken(storedToken);

// Helper to clear auth locally
export const clearAuth = () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  } catch (e) {}
  setAuthToken(null);
};

// Refresh token request using fetch to avoid interceptor recursion
const refreshTokenRequest = async (refreshToken) => {
  if (!refreshToken) throw new Error("No refresh token");
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Refresh failed");
  }
  return res.json();
};

// Axios response interceptor to handle 401s and try token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // If 401 and not retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const stored =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const user = stored ? JSON.parse(stored) : null;
      const refreshToken =
        user?.refreshToken ||
        (typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null);

      if (!refreshToken) {
        clearAuth();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const data = await refreshTokenRequest(refreshToken);
        const { accessToken, refreshToken: newRefresh } = data;

        // Update storage
        const newUser = {
          ...(user || {}),
          accessToken,
          refreshToken: newRefresh,
        };
        try {
          localStorage.setItem("user", JSON.stringify(newUser));
          localStorage.setItem("accessToken", accessToken);
        } catch (e) {}
        setAuthToken(accessToken);
        processQueue(null, accessToken);

        originalRequest.headers["Authorization"] = "Bearer " + accessToken;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Tasks API
export const tasksAPI = {
  getAll: () => apiClient.get("/tasks"),
  getById: (id) => apiClient.get(`/tasks/${id}`),
  create: (data) => apiClient.post("/tasks", data),
  update: (id, data) => apiClient.put(`/tasks/${id}`, data),
  delete: (id) => apiClient.delete(`/tasks/${id}`),
};

// Notes API
export const notesAPI = {
  getAll: () => apiClient.get("/notes"),
  getById: (id) => apiClient.get(`/notes/${id}`),
  create: (data) => apiClient.post("/notes", data),
  update: (id, data) => apiClient.put(`/notes/${id}`, data),
  delete: (id) => apiClient.delete(`/notes/${id}`),
};

// Calendar API
export const calendarAPI = {
  getAll: () => apiClient.get("/calendar"),
  getById: (id) => apiClient.get(`/calendar/${id}`),
  create: (data) => apiClient.post("/calendar", data),
  update: (id, data) => apiClient.put(`/calendar/${id}`, data),
  delete: (id) => apiClient.delete(`/calendar/${id}`),
};

// Timer API
export const timerAPI = {
  getAll: () => apiClient.get("/timer"),
  getById: (id) => apiClient.get(`/timer/${id}`),
  create: (data) => apiClient.post("/timer", data),
  complete: (id) => apiClient.put(`/timer/${id}/complete`),
  delete: (id) => apiClient.delete(`/timer/${id}`),
};

// Health check
export const healthCheck = () => apiClient.get("/health");

// Auth API
export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  refresh: (data) => apiClient.post("/auth/refresh", data),
  logout: (data) => apiClient.post("/auth/logout", data),
};

export default apiClient;
