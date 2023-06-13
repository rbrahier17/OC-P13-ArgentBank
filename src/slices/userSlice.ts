/**
 * userSlice.ts
 * This file contains the Redux slice for managing user-related state.
 * It defines the initial state, actions, and reducers for updating the user state.
 * The slice includes functionality for setting the user data, logging out the user, setting the auth token, and updating the user's name.
 * It also provides utility functions for loading, saving, and removing the authentication token from local storage (remember me feature).
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  token: string;
}

function loadTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem("token");
  return token ? token : null;
}

function saveTokenToLocalStorage(token: string): void {
  localStorage.setItem("token", token);
}

function removeTokenFromLocalStorage(): void {
  localStorage.removeItem("token");
}

const initialToken = loadTokenFromLocalStorage();

const initialState: UserState = {
  isLoggedIn: initialToken !== null,
  firstName: "",
  lastName: "",
  token: initialToken || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.firstName = "";
      state.lastName = "";
      state.token = "";
      removeTokenFromLocalStorage();
    },
    setToken: (state, action: PayloadAction<{ token: string; rememberMe?: boolean }>) => {
      state.token = action.payload.token;
      if (action.payload.rememberMe) {
        saveTokenToLocalStorage(action.payload.token);
      }
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    updateUserName: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser, logoutUser, setToken, setIsLoggedIn, updateUserName } = userSlice.actions;
export default userSlice.reducer;
