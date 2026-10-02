import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = localStorage.getItem("wishlistItems");

const initialState = {
  wishlistItems: savedWishlist
    ? JSON.parse(savedWishlist)
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.wishlistItems.find(
        (x) => x.productId === item.productId
      );

      if (!exists) {
        state.wishlistItems.push(item);

        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.productId !== action.payload
      );

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];

      localStorage.removeItem("wishlistItems");
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;