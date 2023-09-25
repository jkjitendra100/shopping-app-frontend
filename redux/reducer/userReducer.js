import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({ loading: false }, (builder) => {
	builder
		.addCase("loginRequest", (state) => {
			state.loading = true;
		})
		.addCase("isUserRequest", (state) => {
			state.loading = true;
		})
		.addCase("logoutRequest", (state) => {
			state.loading = true;
		})
		.addCase("registerRequest", (state) => {
			state.loading = true;
		});

	builder
		.addCase("loginSuccess", (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.message = action.payload;
		})
		.addCase("isUserSuccess", (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload;
		})
		.addCase("logoutSuccess", (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.message = action.payload;
		})
		.addCase("registerSuccess", (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload;
			state.message = action.payload;
		});

	builder
		.addCase("loginFail", (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
		})
		.addCase("isUserFail", (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
		})
		.addCase("logoutFail", (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
		})
		.addCase("registerFail", (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
		});
});
