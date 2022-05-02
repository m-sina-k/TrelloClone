import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editTaskTitle } from "features/slices/boardsSlice";

import { FiCreditCard } from "react-icons/fi";

const TaskTitle = ({ task, list }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [taskTitle, setTaskTitle] = useState(task.title);
  const nameInputEnterHandler = (e) => {
    if (e && e.keyCode === 13) inputRef.current.blur();
  };

  const updateTaskName = () => {
    if (task.title !== taskTitle && taskTitle.trim() !== "") {
      dispatch(editTaskTitle({ id: task.id, title: taskTitle }));
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex">
      <FiCreditCard className="ml-3" size={24} />
      <div className="w-full">
        <input
          onKeyDown={(e) => nameInputEnterHandler(e)}
          onBlur={updateTaskName}
          type="text"
          ref={inputRef}
          name="task-title-input"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full py-1 px-2 rounded border-2 bg-transparent focus:border-blue-700 focus:shadow"
        />
        <label
          htmlFor="task-title-input"
          className="inline-block text-xs mt-2 text-textColor"
        >
          در لیست "{list.name}"
        </label>
      </div>
    </div>
  );
};

export default TaskTitle;
