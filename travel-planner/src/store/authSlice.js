import { createSlice } from "@reduxjs/toolkit";

const initial = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    login: (state, action) => { state.user = { username: action.payload, isAuthenticated: true }; },
    logout: (state) => { state.user = null; }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
