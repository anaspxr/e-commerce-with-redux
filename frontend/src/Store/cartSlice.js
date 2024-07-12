import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  buyItems: {},
  fetchStatus: "idle",
  updateStatus: "idle",
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
  extraReducers: (builder) => {
    builder
      .addCase(getServerCart.pending, (state) => {
        state.fetchStatus = "pending";
      })
      .addCase(getServerCart.fulfilled, (state, action) => {
        state.fetchStatus = "idle";
        state.cartItems = action.payload;
      })
      .addCase(getServerCart.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const getServerCart = createAsyncThunk(
  "cart/getServerCart",
  async (userID) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userID}`);
      if (!response.ok) throw new Error("failed to fetch data");
      const data = await response.json();
      if (data.cart && Object.keys(data.cart).length > 0) return data.cart;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const updateServerCart = createAsyncThunk(
//   "cart/updateServerCart",
//   async (amount)=>{
//     try{
//       const res = fetch(`http://localhost:3000/users/${userID}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cart: newCart }),
//       });
//     }catch(error){
//       console.log(error);
//     }
//   }
// )

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
