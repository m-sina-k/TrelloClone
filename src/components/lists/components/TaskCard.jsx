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

import { MdOutlineAttachment } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { FiEdit, FiCheckSquare } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";

const TaskCard = ({ item, list }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [taskTitle, setTaskTitle] = useState(item.title);
  const [editingModeEnabled, setEditingModeEnabled] = useState(false);

  // update task title if change by task properties popup
  useEffect(() => {
    setTaskTitle(item.title);
  }, [item.title]);

  const activateEditingMode = (e) => {
    e.stopPropagation();
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

  const calculateTotalChecklistItems = () => {
    if (item.checklists) {
      let totalChecklistItems = [];
      for (let i = 0; i < item.checklists.length; i++) {
        totalChecklistItems = totalChecklistItems.concat(
          item.checklists[i].items
        );
      }
      const compeletedItemsCount = totalChecklistItems.filter(
        (item) => item.isCompeleted
      ).length;
      if (totalChecklistItems.length > 0)
        return (
          <section className="flex items-center">
            <FiCheckSquare size={15} />
            <span className="mr-1 text-xs text-textColor">
              {totalChecklistItems.length} / {compeletedItemsCount}
            </span>
          </section>
        );
    }
  };

  return (
    <motion.li
      key={item.id}
      className={`task-card px-1.5 cursor-pointer bg-white  relative rounded mb-1.5 shadow-sm text-sm ${item.isHidden ? 'hidden' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={openTaskProperties}
    >
      {/* labels */}
      <ul className="flex flex-wrap items-center gap-1 pt-1">
        {item.labels?.length > 0 &&
          item.labels.map((labelColor, index) => (
            <li
              key={index}
              style={{ backgroundColor: labelColor }}
              className="w-10 h-2 rounded-full"
            ></li>
          ))}
      </ul>
      <div
        ref={editBoxRef}
        className={`w-full ${editingModeEnabled ? "relative z-50" : ""}`}
      >
        <TextareaAutosize
          minRows={editingModeEnabled ? 5 : 1.2}
          maxRows={50}
          ref={inputRef}
          value={taskTitle}
          className="rounded w-full h-full flex text-textColor pt-2 cursor-pointer transition-all duration-150 overflow-y-auto focus:cursor-text"
          onMouseDown={(e) => handleTaskTitleInputClick(e)}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => disableInputEnter(e)}
          onFocus={() => inputRef.current.select()}
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
      {/* task properties icon's */}
      <section className="flex gap-1 pb-1">
        {item.desc && <BsCardText size={15} />}
        {item.attachList?.length && <MdOutlineAttachment size={17}/>}
        {item.checklists && (
          calculateTotalChecklistItems()
        )}
        {item.date && <AiOutlineClockCircle size={15}/>}
      </section>

      {/* task edit button */}
      <button
        className="task-card__edit-button hidden absolute z-10 top-1 left-1 p-1.5 transition-all duration-100 rounded bg-light hover:bg-lightShade"
        onClick={(e) => activateEditingMode(e)}
      >
        <FiEdit size={12} />
      </button>
    </motion.li>
  );
};

export default TaskCard;
