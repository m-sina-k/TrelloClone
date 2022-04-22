import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
const defaultBoard = {
  id: uuidV4(),
  name: "تخته شماره ۱",
  isMarked: false,
  lists: [
    {
      id: uuidV4(),
      name: "در حال انجام",
      items: [
        {
          id: uuidV4(),
          title: "ازمایش شماره ۱",
          completed: false,
        },
      ],
    },
    {
      id: uuidV4(),
      name: "انجام شده",
      items: [
        {
          id: uuidV4(),
          title: "ازمایش شماره 2",
          completed: true,
        },
      ],
    },
  ],
};

const LS_Boards = JSON.parse(localStorage.getItem("boards")) || [defaultBoard];

const initialState = {
  boards: LS_Boards,
  get currentBoard() {
    return this.boards[0];
  },
};

const boardsSlice = createSlice({
  name: "boardsSlice",
  initialState,
  reducers: {
    updateBoardName: (state, { payload }) => {
      const editedBoardIndex = state.boards.findIndex(
        (board) => board.id === state.currentBoard.id
      );
      state.boards[editedBoardIndex].name = payload;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    toggleBoardMark: (state) => {
      const editedBoardIndex = state.boards.findIndex(
        (board) => board.id === state.currentBoard.id
      );
      state.boards[editedBoardIndex].isMarked = state.currentBoard.isMarked =
        !state.boards[editedBoardIndex].isMarked;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
  },
});

export const { updateBoardName, toggleBoardMark } = boardsSlice.actions;
export default boardsSlice.reducer;
