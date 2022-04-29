import { createSlice } from "@reduxjs/toolkit";

import bg1 from "assets/images/backgrounds/bg-01.jpg";
import bg2 from "assets/images/backgrounds/bg-02.jpg";
import bg3 from "assets/images/backgrounds/bg-03.jpg";
import bg4 from "assets/images/backgrounds/bg-04.jpg";

const initialState = {
  themeColors: [
    "#82ccdd",
    "#F0E68C",
    "#b71540",
    "#ffd32a",
    "#B33771",
    "#2ecc71",
  ],
  avatarBgColors : [
    "#34495e",
    "#3498db",
    "#2ecc71",
    "#d35400",
    "#6D214F",
    "#EA2027",
  ],
  themeBackgrounds: [bg1, bg2, bg3, bg4],
  activeBackground: JSON.parse(localStorage.getItem("theme")) || {
    type: "color",
    value: "#82ccdd",
  },
  showSettingSidebar: false,
  showBackdrop: false,
  lockBodyScroll: false,
  // getting tooblar heigth to calculate lists container heigth (100vh - toolbarHeight)
  toolbarHeight: null,
  alertConfig: {
    message: null,
    isActive: false,
    callBackName: null,
  },
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setShowSettingSidebar: (state, { payload }) => {
      state.showSettingSidebar = payload;
    },
    changeThemeBackground: (state, { payload }) => {
      state.activeBackground = payload;
      localStorage.setItem("theme", JSON.stringify(payload));
    },
    setShowBackdrop: (state, { payload }) => {
      state.showBackdrop = payload;
      state.lockBodyScroll = payload;
    },
    setToolbarHeight: (state, { payload }) => {
      state.toolbarHeight = payload;
    },
    setAlertConfig: (state, { payload }) => {
      state.alertConfig = payload;
    },
  },
});

export const {
  setShowSettingSidebar,
  changeThemeBackground,
  setShowBackdrop,
  setToolbarHeight,
  setAlertConfig,
} = uiSlice.actions;
export default uiSlice.reducer;
