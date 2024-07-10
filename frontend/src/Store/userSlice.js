import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAdmin: false,
  redirectPath: "/",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      state.isAdmin = action.payload.isAdmin;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("currentUser");
      state.currentUser = null;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
    checkLocalUser: (state) => {
      const userExists = JSON.parse(localStorage.getItem("currentUser"));
      if (userExists) {
        state.currentUser = userExists;
      }
    },
  },
});

export const { login, logout, setRedirectPath, checkLocalUser } =
  userSlice.actions;

export default userSlice.reducer;
