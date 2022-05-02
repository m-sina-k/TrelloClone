import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setShowBackdrop } from "features/slices/uiSlice";
import {
  editTaskTitle,
  setUpdatingListInfo,
  setEditingTask,
} from "features/slices/boardsSlice";
import { useOnClickOutside } from "hooks/useClickOutside";
import TextareaAutosize from "react-textarea-autosize";

import { FiEdit } from "react-icons/fi";

const TaskCard = ({ item, list }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [taskTitle, setTaskTitle] = useState(item.title);
  const [editingModeEnabled, setEditingModeEnabled] = useState(false);

  // update task title if change by task properties popup
  useEffect(() => {
    setTaskTitle(item.title);
  }, [item.title]);

  const activateEditingMode = () => {
    if (!editingModeEnabled) {
      inputRef.current.focus();
      setEditingModeEnabled(true);
      dispatch(setShowBackdrop(true));
    }
  };

  const disableEditingMode = (resetTaskTitle) => {
    if (editingModeEnabled) {
      if (resetTaskTitle) setTaskTitle(item.title);
      setEditingModeEnabled(false);
      dispatch(setShowBackdrop(false));
      inputRef.current.blur();
    }
  };

  // prevent input focus on click
  const handleTaskTitleInputClick = (e) => {
    e.preventDefault();
  };

  const openTaskProperties = () => {
    if (!editingModeEnabled) {
      dispatch(setShowBackdrop(true));
      dispatch(setEditingTask(item));
      dispatch(setUpdatingListInfo(list));
    }
  };

  const disableInputEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      updateTaskTitle();
    }
  };

  const updateTaskTitle = () => {
    if (taskTitle === item.title) {
      disableEditingMode(true);
      return;
    }
    if (taskTitle.trim() === "") {
      inputRef.current.focus();
      return;
    }
    fireEditTaskTitle();
  };

  const fireEditTaskTitle = () => {
    dispatch(setUpdatingListInfo(list));
    dispatch(editTaskTitle({ id: item.id, title: taskTitle }));
    disableEditingMode();
    dispatch(setUpdatingListInfo(null));
  };

  const editBoxRef = useRef();
  useOnClickOutside(editBoxRef, () => disableEditingMode(true));

  return (
    <motion.li
      key={item.id}
      className="task-card bg-bgColor  relative flex items-center justify-between overflow-hidden rounded mb-1.5 shadow-sm text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={editBoxRef}
        className={`w-full ${editingModeEnabled ? "relative z-50" : ""}`}
      >
        <TextareaAutosize
          minRows={editingModeEnabled ? 5 : 1}
          maxRows={50}
          ref={inputRef}
          value={taskTitle}
          className={`rounded w-full h-full flex p-1.5 text-textColor cursor-pointer transition-all duration-150 overflow-y-auto focus:cursor-text`}
          onMouseDown={(e) => handleTaskTitleInputClick(e)}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => disableInputEnter(e)}
          onFocus={() => inputRef.current.select()}
          onClick={openTaskProperties}
        />
        {/* save edited title button */}
        {editingModeEnabled && (
          <button
            onClick={updateTaskTitle}
            className="w-max mt-1.5 py-1 px-4 rounded text-white  bg-green-500 transition-all duration-200 text-sm hover:bg-green-600"
          >
            ذخیره
          </button>
        )}
      </div>

      {/* task edit button */}
      <button
        className="task-card__edit-button hidden absolute z-10 top-1 left-1 p-1.5 transition-all duration-100 rounded bg-light hover:bg-lightShade"
        onClick={activateEditingMode}
      >
        <FiEdit size={12} />
      </button>
    </motion.li>
  );
};

export default TaskCard;
