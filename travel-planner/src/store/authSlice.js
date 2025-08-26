import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userId } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.userId = userId;
      // persist to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;