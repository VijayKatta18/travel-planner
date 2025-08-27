import { createSlice } from "@reduxjs/toolkit";

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
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;