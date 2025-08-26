import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5054/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor (attach JWT token)
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

// Add response interceptor (handles error globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized
            console.error("Unauthorized! Redirecting to login...");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
