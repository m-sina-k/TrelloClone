import { createSlice } from "@reduxjs/toolkit";
import { defaultBoard } from "utils/defultBoard";
import {
  findEditingListIndex,
  saveBoards,
  updateBoards,
} from "helpers/boardHelpers";
const LS_boards = JSON.parse(localStorage.getItem("boards"));
const initialState = {
  updatingListInfo: null,
  editingTask: null,
  boards: LS_boards?.boardsList || null,
  currentBoard: LS_boards?.currentBoard || null,
  showListLength: false,
};
const boardsSlice = createSlice({
  name: "boardsSlice",
  initialState,
  reducers: {
    initialBoards: (state) => {
      state.boards = [defaultBoard];
      state.currentBoard = defaultBoard;
      saveBoards([defaultBoard], defaultBoard);
    },
    updateBoardName: (state, { payload }) => {
      const index = findEditingListIndex(state.boards, state.currentBoard.id);
      state.currentBoard.name = payload;
      state.boards[index].name = payload;
      saveBoards(state.boards, state.currentBoard);
    },
    updateListName: (state, { payload }) => {
      const index = findEditingListIndex(state.currentBoard.lists, payload.id);
      state.currentBoard.lists[index].name = payload.name;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    toggleBoardMark: (state) => {
      const index = findEditingListIndex(state.boards, state.currentBoard.id);
      const boardMarkStatus = (state.currentBoard.isMarked =
        !state.boards[index].isMarked);
      state.boards[index].isMarked = boardMarkStatus;
      saveBoards(state.boards, state.currentBoard);
    },
    setUpdatingListInfo: (state, { payload }) => {
      state.updatingListInfo = payload;
    },
    addNewTask: (state, { payload }) => {
      const index = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      state.currentBoard.lists[index].items.push(payload);
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    crateNewList: (state, { payload }) => {
      state.currentBoard.lists.push(payload);
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    deleteList: (state, { payload }) => {
      state.currentBoard.lists = state.currentBoard.lists.filter(
        (list) => list.id !== payload
      );
      state.boards.find((board) => board.id === state.currentBoard.id).lists =
        state.currentBoard.lists;
      saveBoards(state.boards, state.currentBoard);
    },
    createBoard: (state, { payload }) => {
      state.boards.push(payload);
      saveBoards(state.boards, state.currentBoard);
    },
    switchBoard: (state, { payload }) => {
      state.currentBoard = state.boards.find((board) => board.id === payload);
      saveBoards(state.boards, state.currentBoard);
    },
    editTaskTitle: (state, { payload }) => {
      const index = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const editingList = state.currentBoard.lists[index];
      const editingTaskIndex = findEditingListIndex(
        editingList.items,
        payload.id
      );
      editingList.items[editingTaskIndex].title = payload.title;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    setEditingTask: (state, { payload }) => {
      state.editingTask = payload;
    },
    deleteTask: (state, { payload }) => {
      const index = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const editingListItems = state.currentBoard.lists[index].items;
      state.currentBoard.lists[index].items = editingListItems.filter(
        (item) => item.id !== payload
      );
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    addTaskDesc: (state, { payload }) => {
      const index = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const editingTaskIndex = findEditingListIndex(
        state.currentBoard.lists[index].items,
        payload.id
      );
      state.currentBoard.lists[index].items[editingTaskIndex].desc =
        payload.desc;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    addTaskLabel: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      let labelList = state.editingTask.labels || [];
      if (labelList.indexOf(payload.label) > -1) {
        labelList = labelList.filter((label) => label !== payload.label);
        state.editingTask.labels = labelList;
      } else {
        state.editingTask.labels = [...labelList, payload.label];
      }
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    addTaskChecklist: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      let checklistArr = state.editingTask.checklists || [];
      state.editingTask.checklists = [...checklistArr, payload.checklist];
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    deleteTaskChecklist: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      state.editingTask.checklists = state.editingTask.checklists.filter(
        (checklist) => checklist.id !== payload
      );
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    addChecklistItem: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      const editingChecklist = findEditingListIndex(
        state.editingTask.checklists,
        payload.id
      );
      let checklistArr =
        state.editingTask.checklists[editingChecklist].items || [];
      state.editingTask.checklists[editingChecklist].items = [
        ...checklistArr,
        payload.item,
      ];
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    toggleChecklistItemCompelete: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      const editingChecklist = findEditingListIndex(
        state.editingTask.checklists,
        payload.listId
      );
      const editingChecklistItem = findEditingListIndex(
        state.editingTask.checklists[editingChecklist].items,
        payload.itemId
      );
      state.editingTask.checklists[editingChecklist].items[
        editingChecklistItem
      ].isCompeleted =
        !state.editingTask.checklists[editingChecklist].items[
          editingChecklistItem
        ].isCompeleted;
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    deleteChecklistItem: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      const editingChecklist = findEditingListIndex(
        state.editingTask.checklists,
        payload.listId
      );
      let checklistArr = state.editingTask.checklists[editingChecklist].items;
      state.editingTask.checklists[editingChecklist].items =
        checklistArr.filter((item) => item.id !== payload.itemId);
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    editChecklistItem: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      const editingChecklist = findEditingListIndex(
        state.editingTask.checklists,
        payload.listId
      );
      const editingChecklistItem = findEditingListIndex(
        state.editingTask.checklists[editingChecklist].items,
        payload.itemId
      );
      state.editingTask.checklists[editingChecklist].items[
        editingChecklistItem
      ].title = payload.title;
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    uploadTaskAttachment: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      let attachmentArr = state.editingTask.attachList || [];
      state.editingTask.attachList = [...attachmentArr, payload];
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    removeTaskAttachment: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      let attachmentArr = state.editingTask.attachList;
      state.editingTask.attachList = attachmentArr.filter(
        (item) => item.id !== payload
      );
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    renameAttachment: (state, { payload }) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      let editedAttachIndex = findEditingListIndex(
        state.editingTask.attachList,
        payload.id
      );
      state.editingTask.attachList[editedAttachIndex].name = payload.name;
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    addTaskDate: (state, { payload }) => {
      const editingListIndex = state.currentBoard.lists.findIndex(
        (list) => list.id === state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      state.editingTask.date = payload;
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    removeTaskDate: (state) => {
      const editingListIndex = findEditingListIndex(
        state.currentBoard.lists,
        state.updatingListInfo.id
      );
      const itemIndex = state.currentBoard.lists[
        editingListIndex
      ].items.findIndex((item) => item.id === state.editingTask.id);
      delete state.editingTask.date;
      state.currentBoard.lists[editingListIndex].items[itemIndex] =
        state.editingTask;
      state.boards = updateBoards(state.boards, state.currentBoard);
      saveBoards(state.boards, state.currentBoard);
    },
    filterTask: (state, { payload }) => {
      if (payload?.length) {
        state.showListLength = true;
        if (payload.indexOf("label") > -1) {
          state.currentBoard.lists.map((list) => {
            list.items.map((item) => {
              if (!item.labels?.length > 0) item.isHidden = true;
              else item.isHidden = false;
            });
          });
        }
        if (payload.indexOf("date") > -1) {
          state.currentBoard.lists.map((list) => {
            list.items.map((item) => {
              if (!item.date) item.isHidden = true;
              else item.isHidden = false;
            });
          });
        }
      } else {
        state.showListLength = false;
        state.currentBoard.lists.map((list) => {
          list.items.map((item) => {
            item.isHidden = false;
          });
        });
      }
    },
    deleteBoard: (state, { payload }) => {
      state.boards = state.boards.filter(board=>board.id !== payload)
      state.currentBoard = state.boards[0]
      saveBoards(state.boards, state.currentBoard);
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
  filterTask,
  deleteBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
