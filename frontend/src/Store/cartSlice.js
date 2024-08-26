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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setWholeCart: (state, action) => {
      state.cartItems = action.payload;
    },

    clearFromCart: (state, action) => {
      delete state.cartItems[action.payload.cartID];
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
    addToBuy: (state, action) => {
      state.buyItems = action.payload;
    },

    buyQuantityPlus: (state, action) => {
      const index = state.buyItems.findIndex(
        (item) => item.productID._id === action.payload
      );
      state.buyItems[index].quantity += 1;
    },

    buyQuantityMinus: (state, action) => {
      const index = state.buyItems.findIndex(
        (item) => item.productID._id === action.payload
      );
      const currentQuantity = state.buyItems[index].quantity;
      state.buyItems[index].quantity =
        currentQuantity > 1 ? currentQuantity - 1 : 1;
    },

    removeFromBuy: (state, action) => {
      const index = state.buyItems.findIndex(
        (item) => item.productID._id === action.payload.cartID
      );
      state.buyItems.splice(index, 1);
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
  addToBuy,
  clearCart,
  clearFromCart,
  clearBuy,
  buyQuantityMinus,
  buyQuantityPlus,
  removeFromBuy,
} = cartSlice.actions;

export default cartSlice.reducer;
