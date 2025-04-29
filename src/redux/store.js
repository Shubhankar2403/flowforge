import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "@/features/flowbuilder/flowSlice";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
});
