import Tags from "./Tags";
import DeleteTask from "./DeleteTask";

// import { FiCheckSquare } from "react-icons/fi";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import { MdOutlineAttachment } from "react-icons/md";

const AvailableProps = ({ task, setActiveDropdown, closeTaskProperties }) => {
  return (
    <div>
      <small className="text-textColor">ویژگی ها : </small>
      {/* available properties container */}
      <ul className="mt-2.5">
        <Tags task={task} setActiveDropdown={setActiveDropdown} />
        <DeleteTask
          task={task}
          setActiveDropdown={setActiveDropdown}
          closeTaskProperties={closeTaskProperties}
        />
      </ul>
    </div>
  );
};

export default AvailableProps;
