import { createSlice } from "@reduxjs/toolkit";
import bg1 from "assets/images/backgrounds/bg-01.jpg";
import bg2 from "assets/images/backgrounds/bg-02.jpg";
import bg3 from "assets/images/backgrounds/bg-03.jpg";
import bg4 from "assets/images/backgrounds/bg-04.jpg";

const initialState = {
  themeColors: [
    "#227093",
    "#ccae62",
    "#ffbe76",
    "#EA2027",
    "#f7b731",
    "#6D214F",
    "#44bd32",
    "#b33939",
    "#3d3d3d",
    "#e66767"
  ],
  avatarBgColors: [
    "#3ae374",
    "#3498db",
    "#f53b57",
    "#ffa801",
    "#EA2027",
  ],
  themeBackgrounds: [bg1, bg2, bg3, bg4],
  activeBackground: JSON.parse(localStorage.getItem("theme")) || {
    type: "color",
    value: "#227093",
  },
  showSettingSidebar: false,
  // getting tooblar heigth to calculate lists container heigth (100vh - toolbarHeight)
  toolbarHeight: null,
  alertConfig: {
    message: null,
    isActive: false,
    callback: {
      name: null,
      payload: null,
    },
  },
  labelColors: [
    "#61bd4f",
    "#f2d600",
    "#ff9f1a",
    "#eb5a46",
    "#c377e0",
    "#0079bf",
  ],
  previewerFile: null,
  playAudio: localStorage.getItem("audioConfig")
    ? JSON.parse(localStorage.getItem("audioConfig"))
    : true,
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
    },
    setToolbarHeight: (state, { payload }) => {
      state.toolbarHeight = payload;
    },
    setAlertConfig: (state, { payload }) => {
      state.alertConfig = payload;
    },
    setPreviewerFile: (state, { payload }) => {
      state.previewerFile = payload;
    },
    togglePlayAudio: (state) => {
      state.playAudio = !state.playAudio;
      localStorage.setItem("audioConfig", JSON.stringify(state.playAudio));
    },
  },
});

export const {
  setShowSettingSidebar,
  changeThemeBackground,
  setShowBackdrop,
  setToolbarHeight,
  setAlertConfig,
  setPreviewerFile,
  togglePlayAudio,
} = uiSlice.actions;
export default uiSlice.reducer;
