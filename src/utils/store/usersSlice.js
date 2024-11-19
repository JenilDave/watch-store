import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
    initializeUser: (state) => {
      state.value = {};
    },
  },
  selectors: {
    selectValue: (state) => state.value,
  }
});

export const { addUser, initializeUser } = user.actions;

export const { selectValue } = user.selectors.selectValue;

export default user.reducer;
