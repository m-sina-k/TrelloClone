import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDropdown: null,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setActiveDropdown: (state, { payload }) => {
      if (state.activeDropdown === payload) state.activeDropdown = null;
      else state.activeDropdown = payload;
    },
  },
});

export const { setActiveDropdown } = uiSlice.actions;
export default uiSlice.reducer;
