"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/utils/store/store";
import { initializeUsersList } from "@/utils/store/usersSlice";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renderss
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeUsersList());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}