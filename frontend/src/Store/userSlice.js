import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAdmin: false,
  accessToken: null,
  redirectPath: "/",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.currentUser = action.payload.user;
      state.isAdmin = action.payload.user.isAdmin;
    },
    logout: (state) => {
      // clear the accessToken and reset all states
      state.accessToken = null;
      state.currentUser = null;
      state.isAdmin = false;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
  },
});

export const { login, logout, setRedirectPath } = userSlice.actions;

export default userSlice.reducer;
