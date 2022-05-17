export const findEditingListIndex = (array, id) =>
  array.findIndex((item) => item.id === id);

export const saveBoards = (boardsList, currentBoard) => {
  localStorage.setItem(
    "boards",
    JSON.stringify({
      boardsList,
      currentBoard,
    })
  );
};

export const updateBoards = (boardsList, currentBoard) => {
  let updatedBoards;
  if (boardsList.length > 1) {
    const tempBoards = boardsList.filter((item) => item.id !== currentBoard.id);
    updatedBoards = [...tempBoards, currentBoard];
  } else {
    updatedBoards = [currentBoard];
  }
  return updatedBoards;
};

// if (state.boards.length > 1) {
//   state.boards = [
//     tempBoards(state.boards, state.currentBoard.id),
//     state.currentBoard,
//   ];
// } else {
//   state.boards = [state.currentBoard];
// }
