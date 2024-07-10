import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAdmin: false,
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
      localStorage.removeItem("currentItem");
      state.currentUser = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
