import Tags from "./Tags";
import Date from "./Date";
import Desc from "./Desc";
import Attachment from "./Attachment";
import Checklists from "./check-list";

const TaskCurrentProps = ({ task, setActiveDropdown }) => {
  return (
    <div className="pl-2">
      {task.labels?.length > 0 && (
        <Tags task={task} setActiveDropdown={setActiveDropdown} />
      )}
      {task.date?.days && <Date task={task} />}
      <Desc task={task} setActiveDropdown={setActiveDropdown} />
      {task.attachList?.length > 0 && (
        <Attachment task={task} setActiveDropdown={setActiveDropdown} />
      )}
      {task.checklists?.length > 0 && (
        <Checklists task={task} setActiveDropdown={setActiveDropdown} />
      )}
    </div>
  );
};

export default TaskCurrentProps;
