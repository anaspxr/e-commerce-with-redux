import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  buyItems: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
    clearFromCart: (state) => {
      state.value = {};
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
