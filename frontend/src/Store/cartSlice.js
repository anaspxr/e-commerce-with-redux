import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.value[action.payload]) {
        state.value[action.payload] += 1;
      } else {
        state.value[action.payload] = 1;
      }
    },
    removeFromCart: (state, action) => {
      if (state.value[action.payload] > 1) {
        state.value[action.payload] -= 1;
      } else {
        delete state.value[action.payload];
      }
    },
    clearFromCart: (state) => {
      state.value = {};
    },
  },
});

export const { addToCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
