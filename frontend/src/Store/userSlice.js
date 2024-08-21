import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorCatch from "../utils/axiosErrorCatch";

const initialState = {
  currentUser: null,
  isAdmin: false,
  accessToken: null,
  loading: false,
  error: null,
  redirectPath: "/",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.currentUser = action.payload.user;
        state.isAdmin = action.payload.user.isAdmin;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.accessToken = null;
        state.currentUser = null;
        state.isAdmin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder //refreshToken
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAdmin = action.payload.user.isAdmin;
      });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        values,
        {
          withCredentials: true,
        }
      );
      return data; //data contains user (user details) and accessToken
    } catch (error) {
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/refreshtoken",
        {},
        {
          withCredentials: true, // Ensures cookies are included in the request
        }
      );
      return {
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    } catch (error) {
      return rejectWithValue(console.log(axiosErrorCatch(error)));
    }
  }
);

export const { setRedirectPath } = userSlice.actions;

export default userSlice.reducer;
