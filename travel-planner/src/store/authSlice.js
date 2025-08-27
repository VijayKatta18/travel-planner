import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

let savedAuth = null;

try {
  savedAuth =
    JSON.parse(localStorage.getItem("auth")) ||
    JSON.parse(sessionStorage.getItem("auth"));
} catch (err) {
  console.error("Invalid auth data in storage", err);
  savedAuth = null;
}


const initialState = {
  token: savedAuth?.token || null,
  userId: savedAuth?.userId || null,
  isAuthenticated: savedAuth?.token ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userId, rememberMe } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.userId = userId;
      // persist depending on rememberMe
      const data = JSON.stringify({ token, userId });
      if (rememberMe) {
        localStorage.setItem("auth", data);
      }
      else {
        sessionStorage.setItem("auth", data);
      }
    },
    registerSuccess: (state, action) => {
      const {token, userId} = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
    }
  }
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;