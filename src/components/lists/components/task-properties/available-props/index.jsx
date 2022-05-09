import { useDispatch } from "react-redux";
import { deleteTask } from "features/slices/boardsSlice";

import Checklist from "./Checklist";
import Tags from "./Tags";
import Attachment from "./Attachment";
import DeleteTask from "./components/DeleteProp";

// import { AiOutlineClockCircle } from "react-icons/ai";

const AvailableProps = ({ task, setActiveDropdown, closeTaskProperties }) => {
  const dispatch = useDispatch()
  const fireDeleteTask = ()=> {
    dispatch(deleteTask(task.id))
    
    closeTaskProperties();
  };
  return (
    <div>
      <small className="text-textColor">ویژگی ها : </small>
      {/* available properties container */}
      <ul className="mt-2.5">
        <Tags task={task} setActiveDropdown={setActiveDropdown} />
        <Checklist task={task} setActiveDropdown={setActiveDropdown} />
        <Attachment task={task} setActiveDropdown={setActiveDropdown}/>
        <DeleteTask
          btnText="حذف این کار"
          headingText='کار حذف شود؟'
          task={task}
          setActiveDropdown={setActiveDropdown}
          callback={fireDeleteTask}
          deleteIcon
          btnStyle="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-red-600 text-white hover:bg-red-700"
        />
      </ul>
    </div>
  );
};

export default AvailableProps;
