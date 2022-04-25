import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

const LS_boards = JSON.parse(localStorage.getItem("boards"));

const initialState = {
  updatingListInfo: null,
  boards: LS_boards?.boardsList || null,
  currentBoard: LS_boards?.currentBoard || null,
};

const boardsSlice = createSlice({
  name: "boardsSlice",
  initialState,
  reducers: {
    initialBoards: (state) => {
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
              },
              {
                id: uuidV4(),
                title: "ازمایش شماره 2",
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
              },
            ],
          },
        ],
      };
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: [defaultBoard],
          currentBoard: defaultBoard,
        })
      );
      state.boards = [defaultBoard];
      state.currentBoard = defaultBoard;
    },
    updateBoardName: (state, { payload }) => {
      const editedBoardIndex = state.boards.findIndex(
        (board) => board.id === state.currentBoard.id
      );
      state.currentBoard.name = payload;
      state.boards[editedBoardIndex].name = payload;
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    updateListName: (state, { payload }) => {
      const editedListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      state.currentBoard.lists[editedListIndex].name = payload;

      state.boards = [...state.boards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    toggleBoardMark: (state) => {
      const editedBoardIndex = state.boards.findIndex(
        (board) => board.id === state.currentBoard.id
      );
      state.boards[editedBoardIndex].isMarked = state.currentBoard.isMarked =
        !state.boards[editedBoardIndex].isMarked;
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    setUpdatingListInfo: (state, { payload }) => {
      state.updatingListInfo = payload;
    },
    addNewTask: (state, { payload }) => {
      const listIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      state.currentBoard.lists[listIndex].items.push(payload);
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    crateNewList: (state, { payload }) => {
      state.currentBoard.lists.push(payload);
      const tempBoards = state.boards.filter(board=>board.id !== state.currentBoard.id)
      state.boards = [...tempBoards,state.currentBoard]
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
  },
});

export const {
  updateBoardName,
  updateListName,
  toggleBoardMark,
  initialBoards,
  setUpdatingListInfo,
  addNewTask,
  crateNewList,
} = boardsSlice.actions;
export default boardsSlice.reducer;
