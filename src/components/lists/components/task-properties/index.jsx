import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowBackdrop } from "features/slices/uiSlice";
import { setEditingTask } from "features/slices/boardsSlice";
import { useOnClickOutside } from "hooks/useClickOutside";
import TaskTitle from "./TaskTitle";
import TaskCurrentProps from "./current-props";
import AvailableProps from "./available-props";

import { CgClose } from "react-icons/cg";

const TaskProperties = () => {
  const dispatch = useDispatch();
  const { editingTask: task, updatingListInfo } = useSelector(
    (state) => state.boardsState
  );

  // state for active property dropdown,if true prevent modal close on click outside
  const [activeDropdown, setActiveDropdown] = useState(false);

  // close modal
  const closeTaskProperties = () => {
    dispatch(setShowBackdrop(false));
    dispatch(setEditingTask(null));
  };

  const taskPropertiesRef = useRef();
  useOnClickOutside(taskPropertiesRef, () => {
    // prevent modal from closing if a property dropdown is active
    if (!activeDropdown) closeTaskProperties();
  });


  return (
    <div
      className="vertical-scrollbar fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[700px] max-w-[98%] min-h-[85vh] rounded-xl shadow p-7 bg-bgColor"
      ref={taskPropertiesRef}
    >
      {/* close button */}
      <CgClose
        className="absolute top-2 left-2 cursor-pointer p-1 text-textColor w-7 h-7 rounded-full hover:text-black hover:bg-light"
        size={18}
        onClick={closeTaskProperties}
      />

      {/* properties container */}
      <div className="mt-5">
        <TaskTitle task={task} list={updatingListInfo} />
        <div className="grid grid-cols-[3.5fr_1.5fr] gap-x-3 mt-3">
          {/* existing properties */}
          <div className="max-h-[500px] overflow-y-auto">
          <TaskCurrentProps task={task} setActiveDropdown={setActiveDropdown} />
          </div>
          {/* availbale properties */}
          <AvailableProps
            task={task}
            setActiveDropdown={setActiveDropdown}
            closeTaskProperties={closeTaskProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskProperties;
