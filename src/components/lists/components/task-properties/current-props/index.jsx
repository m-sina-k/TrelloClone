import Desc from "./Desc";

const TaskCurrentProps = ({ task,setActiveDropdown }) => {
  return (
    <div>
      <Desc task={task} setActiveDropdown={setActiveDropdown}/>
    </div>
  );
};

export default TaskCurrentProps;
