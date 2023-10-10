import { createReducer } from '@reduxjs/toolkit';

export const playerReducer = createReducer(
  { products: [], product: {}, loading: false },
  (builder) => {
    builder
      .addCase('addNewPlayerRequest', (state) => {
        state.loading = true;
        state.addPlayerModal = true;
      })
      .addCase('getAdminProductsRequest', (state) => {
        state.loading = true;
      })
      .addCase('getProductDetailsRequest', (state) => {
        state.loading = true;
      });

    builder
      .addCase('addNewPlayerSuccess', (state, action) => {
        state.loading = false;
        state.addPlayerModal = false;
        state.message = action.payload;
      })
      .addCase('getAdminProductsSuccess', (state, action) => {
        state.loading = false;
        state.products = action.payload?.products;
        state.inStock = action.payload?.inStock;
        state.outOfStock = action.payload?.outOfStock;
      })
      .addCase('getProductDetailsSuccess', (state, action) => {
        state.loading = false;
        state.products = action.payload?.products;
        state.inStock = action.payload?.inStock;
        state.outOfStock = action.payload?.outOfStock;
      });

    builder
      .addCase('addNewPlayerFail', (state, action) => {
        state.loading = false;
        state.addPlayerModal = false;
        state.error = action.payload;
      })
      .addCase('getAdminProductsFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getProductDetailsFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
