import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosErrorCatch from "../utils/axiosErrorCatch";

const initialState = {
  cartItems: [],
  buyItems: [],
  wishlist: [],
  orders: [],
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
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.buyItems = [];
      state.wishlist = [];
      state.orders = [];
      state.fetching = false;
      state.updating = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServerCart.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getServerCart.fulfilled, (state, action) => {
        state.fetching = false;
        state.cartItems = action.payload?.cart;
        state.wishlist = action.payload?.wishlist.products;
        state.error = null;
      })
      .addCase(getServerCart.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      });
  },
});

export const getServerCart = createAsyncThunk(
  "cart/getServerCart",
  async (axiosPrivate, { rejectWithValue }) => {
    const data = {};
    try {
      const { data: cart } = await axiosPrivate.get("user/cart");
      data.cart = cart.products;
    } catch (err) {
      rejectWithValue(axiosErrorCatch(err));
    }
    try {
      const { data: wishlist } = await axiosPrivate.get("user/wishlist");
      data.wishlist = wishlist;
    } catch (err) {
      data.wishlist = [];
    }
    return data;
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
  setWishlist,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
