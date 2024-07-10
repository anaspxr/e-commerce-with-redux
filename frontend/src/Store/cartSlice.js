import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  buyItems: {},
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
    addToCart: (state, action) => {
      if (state.cartItems[action.payload.cartID]) {
        state.cartItems[action.payload.cartID] += 1;
      } else {
        state.cartItems[action.payload.cartID] = 1;
      }
      updateServerSide(state.cartItems, action.payload.userID);
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
