import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosErrorCatch from "../utils/axiosErrorCatch";
import axios from "axios";

const initialState = {
  cartItems: [],
  buyItems: [],
  fetching: false,
  updating: false,
  error: null,
};

const updateServerSide = async (newCart, userID) => {
  fetch(`http://localhost:3000/users/${userID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart: newCart }),
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setWholeCart: (state, action) => {
      state.cartItems = action.payload;
    },

    removeFromCart: (state, action) => {
      if (state.cartItems[action.payload.cartID] > 1) {
        state.cartItems[action.payload.cartID] -= 1;
      } else {
        delete state.cartItems[action.payload.cartID];
      }
      updateServerSide(state.cartItems, action.payload.userID);
    },

    clearFromCart: (state, action) => {
      delete state.cartItems[action.payload.cartID];
      updateServerSide(state.cartItems, action.payload.userID);
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
    addToBuy: (state, action) => {
      state.buyItems = action.payload;
    },
    buyQuantityPlus: (state, action) => {
      state.buyItems[action.payload] += 1;
    },
    buyQuantityMinus: (state, action) => {
      if (state.buyItems[action.payload] > 1) {
        state.buyItems[action.payload] -= 1;
      } else {
        delete state.buyItems[action.payload];
      }
    },
    clearBuy: (state) => {
      state.buyItems = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServerCart.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getServerCart.fulfilled, (state, action) => {
        state.fetching = false;
        state.cartItems = action.payload;
      })
      .addCase(getServerCart.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      });
  },
});

export const getServerCart = createAsyncThunk(
  "cart/getServerCart",
  async (accessToken, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/user/cart", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return data.products;
    } catch (err) {
      rejectWithValue(axiosErrorCatch(err));
    }
  }
);

export const {
  setWholeCart,
  removeFromCart,
  addToBuy,
  clearCart,
  clearFromCart,
  clearBuy,
  buyQuantityMinus,
  buyQuantityPlus,
} = cartSlice.actions;

export default cartSlice.reducer;
