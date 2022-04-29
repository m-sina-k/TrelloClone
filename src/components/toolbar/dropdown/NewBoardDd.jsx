import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBoard,switchBoard } from "features/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";

const NewBoardDd = ({ setShowDropdown }) => {
  const dispatch = useDispatch();
  const { avatarBgColors } = useSelector((state) => state.uiState);
  const [newBoardName, setNewBoardName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (newBoardName.trim() !== "") setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  }, [newBoardName]);

  const newBoardFromSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      id: uuidv4(),
      name: newBoardName,
      isMarked: false,
      avatarBg:
        avatarBgColors[Math.floor(Math.random() * avatarBgColors.length)],
      lists: [],
    };
    setShowDropdown(false);
    dispatch(createBoard(newBoard));
    dispatch(switchBoard(newBoard.id))
  };
  return (
    <form action="#" className="p-2" onSubmit={(e) => newBoardFromSubmit(e)}>
      <label htmlFor="new-board-name-input" className="text-sm mb-3 block">
        نام تخته جدید را وارد نمایید :
      </label>
      <input
        value={newBoardName}
        onChange={(e) => setNewBoardName(e.target.value)}
        type="text"
        name="new-board-name-input"
        autoFocus
        className="rounded border-2 border-blue-700 text-sm w-full py-1 px-2.5"
      />

      <button
        disabled={isSubmitDisabled}
        type="submit"
        className="py-1.5 mt-1.5 transition-all duration-150 bg-primaryTint hover:bg-primary text-white w-full rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        افزودن تخته جدید
      </button>
    </form>
  );
};

export default NewBoardDd;
