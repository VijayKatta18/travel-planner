import api from "../api/api";


export const googleLogin = async (idToken) => {
  const response = await api.post("/auth/google", JSON.stringify(idToken));
  return response.data;
};


// Login → returns token and user data
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Register → create new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};
