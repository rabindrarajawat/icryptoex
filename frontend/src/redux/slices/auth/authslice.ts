import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the authentication state
export interface IAuthState {
  user: any;
  authState: boolean;
}

// Initial state for the authentication slice
const initialState: IAuthState = {
    authState: false,
    user: undefined
};

// Create the authentication slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
});

// Export actions and reducer from the slice
export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
