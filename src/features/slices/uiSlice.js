import { createSlice } from "@reduxjs/toolkit";

import bg1 from "assets/images/backgrounds/bg-01.jpg";
import bg2 from "assets/images/backgrounds/bg-02.jpg";
import bg3 from "assets/images/backgrounds/bg-03.jpg";
import bg4 from "assets/images/backgrounds/bg-04.jpg";

const initialState = {
  activeDropdown: null,
  themeColors: [
    "#82ccdd",
    "#F0E68C",
    "#b71540",
    "#ffd32a",
    "#B33771",
    "#2ecc71",
  ],
  themeBackgrounds: [bg1, bg2, bg3, bg4],
  activeBackground: JSON.parse(localStorage.getItem("theme")) || {
    type: "color",
    value: "#82ccdd",
  },
  showSettingSidebar: false,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setActiveDropdown: (state, { payload }) => {
      if (state.activeDropdown === payload) state.activeDropdown = null;
      else state.activeDropdown = payload;
    },
    setShowSettingSidebar: (state, { payload }) => {
      state.showSettingSidebar = payload;
    },
    changeThemeBackground: (state, { payload }) => {
      state.activeBackground = payload;
      localStorage.setItem("theme", JSON.stringify(payload));
    },
  },
});

export const {
  setActiveDropdown,
  setShowSettingSidebar,
  changeThemeBackground,
} = uiSlice.actions;
export default uiSlice.reducer;
