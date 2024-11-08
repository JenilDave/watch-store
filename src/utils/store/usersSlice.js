import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    initializeUsersList: (state) => {
      state = [];
    },
  },
});

export const { addUser, initializeUsersList } = users.actions;

export const selectUsers = (state) => state.users;

export default users.reducer;
