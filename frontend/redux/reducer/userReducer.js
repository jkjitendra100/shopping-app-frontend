import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer({ loading: false }, (builder) => {
  // Register Request
  builder
    .addCase('registerSuccess', (state, action) => {
      state.isAuthenticated = true;
    })
    .addCase('registerFail', (state, action) => {
      state.isAuthenticated = false;
    });

  // Login Request
  builder
    .addCase('loginSuccess', (state, action) => {
      state.isAuthenticated = true;
    })
    .addCase('loginFail', (state, action) => {
      state.isAuthenticated = false;
    });

  // My profile request
  builder
    .addCase('myProfileSuccess', (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('myProfileFail', (state, action) => {
      state.isAuthenticated = false;
    });

  // Logout request
  builder
    .addCase('logoutSuccess', (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase('logoutFail', (state, action) => {
      state.isAuthenticated = false;
    });
});
