import { createReducer } from '@reduxjs/toolkit';

export const cartReducer = createReducer({ cart: [] }, (builder) => {
  builder
    .addCase('addToCart', (state, action) => {
      state.cart = action.payload;
    })
    .addCase('removeFromCart', (state, action) => {
      state.cart = action.payload;
    })
    .addCase('increaseCartItemQuantity', (state, action) => {
      state.cart = action.payload;
    })
    .addCase('decreaseCartItemQuantity', (state, action) => {
      state.cart = action.payload;
    })
    .addCase('updateCart', (state, action) => {
      state.cart = action.payload;
    });
});
