import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
  });
};
