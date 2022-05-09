import Tags from "./Tags";
import Desc from "./Desc";
import Attachment from "./Attachment";
import Checklists from "./check-list";

const TaskCurrentProps = ({ task, setActiveDropdown }) => {
  return (
    <div className="pl-2">
      {task.labels?.length > 0 && (
        <Tags task={task} setActiveDropdown={setActiveDropdown} />
      )}
      <Desc task={task} setActiveDropdown={setActiveDropdown} />
      {task.attachList?.length && (
        <Attachment task={task} setActiveDropdown={setActiveDropdown} />
      )}
      {task.checklists?.length > 0 && (
        <Checklists task={task} setActiveDropdown={setActiveDropdown} />
      )}
    </div>
  );
};

export default TaskCurrentProps;
