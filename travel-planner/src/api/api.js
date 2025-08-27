import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5054/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        let auth = null;
        try {
            auth =
                JSON.parse(localStorage.getItem("auth")) ||
                JSON.parse(sessionStorage.getItem("auth"));
        } catch (err) {
            console.error("Invalid auth data in storage", err);
            auth = null;
        }

        if (auth?.token) {
            config.headers.Authorization = `Bearer ${auth.token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
