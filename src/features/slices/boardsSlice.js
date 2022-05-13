import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

const LS_boards = JSON.parse(localStorage.getItem("boards"));

const initialState = {
  updatingListInfo: null,
  editingTask: null,
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
        avatarBg: "#6D214F",
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
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    deleteList: (state, { payload }) => {
      const tempLists = state.currentBoard.lists.filter(
        (list) => list.id !== payload
      );
      state.currentBoard.lists = tempLists;
      state.boards.find((board) => board.id === state.currentBoard.id).lists =
        state.currentBoard.lists;
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    createBoard: (state, { payload }) => {
      state.boards.push(payload);
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    switchBoard: (state, { payload }) => {
      state.currentBoard = state.boards.find((board) => board.id === payload);
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    editTaskTitle: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      const editingList = state.currentBoard.lists[editingListIndex];
      const editingTaskIndex = editingList.items.findIndex(
        (item) => item.id === payload.id
      );
      editingList.items[editingTaskIndex].title = payload.title;
      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    setEditingTask: (state, { payload }) => {
      state.editingTask = payload;
    },
    deleteTask: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      const editingListItems = state.currentBoard.lists[editingListIndex].items;
      state.currentBoard.lists[editingListIndex].items =
        editingListItems.filter((item) => item.id !== payload);
      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    addTaskDesc: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      const editingTaskIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === payload.id);
      state.currentBoard.lists[editingListIndex].items[editingTaskIndex].desc =
        payload.desc;
      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    addTaskLabel: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );

      let labelList = state.editingTask.labels || [];

      if (labelList.indexOf(payload.label) > -1) {
        labelList = labelList.filter((label) => label !== payload.label);
        state.editingTask.labels = labelList;
      } else {
        state.editingTask.labels = [...labelList, payload.label];
      }

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    addTaskChecklist: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );

      let checklistArr = state.editingTask.checklists || [];
      state.editingTask.checklists = [...checklistArr, payload.checklist];

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    deleteTaskChecklist: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );

      state.editingTask.checklists = state.editingTask.checklists.filter(
        (checklist) => checklist.id !== payload
      );

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    addChecklistItem: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );
      const editingChecklist = state.editingTask.checklists.findIndex(
        (checklist) => checklist.id === payload.id
      );
      let checklistArr =
        state.editingTask.checklists[editingChecklist].items || [];

      state.editingTask.checklists[editingChecklist].items = [
        ...checklistArr,
        payload.item,
      ];

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    toggleChecklistItemCompelete: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );
      const editingChecklist = state.editingTask.checklists.findIndex(
        (checklist) => checklist.id === payload.listId
      );
      const editingChecklistItem = state.editingTask.checklists[
        editingChecklist
      ].items.findIndex((item) => item.id === payload.itemId);

      state.editingTask.checklists[editingChecklist].items[
        editingChecklistItem
      ].isCompeleted =
        !state.editingTask.checklists[editingChecklist].items[
          editingChecklistItem
        ].isCompeleted;

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    deleteChecklistItem: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );
      const editingChecklist = state.editingTask.checklists.findIndex(
        (checklist) => checklist.id === payload.listId
      );
      let checklistArr = state.editingTask.checklists[editingChecklist].items;

      state.editingTask.checklists[editingChecklist].items =
        checklistArr.filter((item) => item.id !== payload.itemId);

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    editChecklistItem: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );
      const editingChecklist = state.editingTask.checklists.findIndex(
        (checklist) => checklist.id === payload.listId
      );
      const editingChecklistItem = state.editingTask.checklists[
        editingChecklist
      ].items.findIndex((item) => item.id === payload.itemId);

      state.editingTask.checklists[editingChecklist].items[
        editingChecklistItem
      ].title = payload.title;

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    uploadTaskAttachment: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );
      let attachmentArr = state.editingTask.attachList || [];

      state.editingTask.attachList = [...attachmentArr, payload];
      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];
      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    removeTaskAttachment: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );

      let attachmentArr = state.editingTask.attachList;

      state.editingTask.attachList = attachmentArr.filter(
        (item) => item.id !== payload
      );

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    renameAttachment: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );

      let editedAttachIndex = state.editingTask.attachList.findIndex(
        (attch) => attch.id === payload.id
      );

      state.editingTask.attachList[editedAttachIndex].name = payload.name;

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    addTaskDate: (state, { payload }) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );

      state.editingTask.date = payload;

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
      localStorage.setItem(
        "boards",
        JSON.stringify({
          boardsList: state.boards,
          currentBoard: state.currentBoard,
        })
      );
    },
    removeTaskDate: (state) => {
      const tempBoards = state.boards.filter(
        (board) => board.id !== state.currentBoard.id
      );
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );

      const tempItems = state.currentBoard.lists[editingListIndex].items.filter(
        (item) => item.id !== state.editingTask.id
      );
      delete state.editingTask.date;

      state.currentBoard.lists[editingListIndex].items = [
        ...tempItems,
        state.editingTask,
      ];

      state.boards = [...tempBoards, state.currentBoard];
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
  createBoard,
  deleteList,
  switchBoard,
  editTaskTitle,
  setEditingTask,
  deleteTask,
  addTaskDesc,
  addTaskLabel,
  addTaskChecklist,
  deleteTaskChecklist,
  addChecklistItem,
  toggleChecklistItemCompelete,
  deleteChecklistItem,
  editChecklistItem,
  uploadTaskAttachment,
  removeTaskAttachment,
  renameAttachment,
  addTaskDate,
  removeTaskDate,
} = boardsSlice.actions;
export default boardsSlice.reducer;
