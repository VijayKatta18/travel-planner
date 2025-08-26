import api from "../api/api";

// Login → returns token and user data
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const { token, userId } = response.data;

  // Store token in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userId));

  return { token, userId };
};

// Register → create new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Logout → clear token & user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // redirect to login
};