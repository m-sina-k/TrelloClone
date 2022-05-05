import Tags from "./Tags";
import Desc from "./Desc";

const TaskCurrentProps = ({ task, setActiveDropdown }) => {
  return (
    <div>
      {task.labels?.length > 0 && <Tags task={task}  setActiveDropdown={setActiveDropdown}/>}
      <Desc task={task} setActiveDropdown={setActiveDropdown} />
    </div>
  );
};

export default TaskCurrentProps;
