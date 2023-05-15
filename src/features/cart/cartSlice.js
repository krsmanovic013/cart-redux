import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((a) => a.id != itemId);
    },
    increase: (state, action) => {
      const item = state.cartItems.find((a) => a.id == action.payload);
      item.amount = item.amount + 1;
    },
    decrease: (state, action) => {
      const item = state.cartItems.find((a) => a.id == action.payload);
      item.amount = item.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((a) => {
        amount += a.amount;
        total += a.amount * a.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});
// console.log(cartSlice);

export const cartReducer = cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
