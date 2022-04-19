import { configureStore } from "@reduxjs/toolkit";
import uiState from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    uiState,
  },
});
