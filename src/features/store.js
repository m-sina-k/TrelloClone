import { configureStore } from "@reduxjs/toolkit";
import uiState from "./slices/uiSlice";
import boardsState from './slices/boardsSlice'

export const store = configureStore({
  reducer: {
    uiState,
    boardsState
  },
});
