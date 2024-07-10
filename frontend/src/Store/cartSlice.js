import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  buyItems: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setWholeCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      if (state.cartItems[action.payload]) {
        state.cartItems[action.payload] += 1;
      } else {
        state.cartItems[action.payload] = 1;
      }
    },
    removeFromCart: (state, action) => {
      if (state.cartItems[action.payload] > 1) {
        state.cartItems[action.payload] -= 1;
      } else {
        delete state.cartItems[action.payload];
      }
    },
    clearFromCart: (state, action) => {
      delete state.cartItems[action.payload];
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
});

export const {
  setWholeCart,
  addToCart,
  removeFromCart,
  addToBuy,
  clearCart,
  clearFromCart,
  clearBuy,
  buyQuantityMinus,
  buyQuantityPlus,
} = cartSlice.actions;

export default cartSlice.reducer;
