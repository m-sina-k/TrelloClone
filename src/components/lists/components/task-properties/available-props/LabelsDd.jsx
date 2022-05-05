import { useSelector, useDispatch } from "react-redux";
import { addTaskLabel } from "features/slices/boardsSlice";

import { CgClose } from "react-icons/cg";

const LabelsDd = ({ task,closeDd,setActiveDropdown,showLabelsDd }) => {
  const dispatch = useDispatch();
  const { labelColors } = useSelector((state) => state.uiState);
  const fireAddTaskLabel = (color) => {
    // if existing label removed , close task properties on click outside
    if(task.labels?.indexOf(showLabelsDd) !== -1 && !showLabelsDd) setActiveDropdown(false)
    dispatch(addTaskLabel({ id: task.id, label: color }));
  };
  return (
    <div className="absolute z-10 top-[115%] right-0 min-w-[250px] p-2 rounded shadow-md bg-white">
      <section className="flex items-center justify-between pb-1.5 border-b-2 border-light">
        <h6 className="text-sm text-black">برچسب ها</h6>
        <CgClose
          size={15}
          className="cursor-pointer"
          onClick={() => {
            closeDd();
            setActiveDropdown(false);
          }}
        />
      </section>
      <ul className="mt-2">
        {labelColors.map((color, index) => (
          <li
            key={index}
            className={`rounded w-full h-8 cursor-pointer mb-2 transition-all duration-150 hover:scale-95 ${
              task.labels?.indexOf(color) > -1 ? "setting-option--active" : ""
            }`}
            style={{ background: color }}
            onClick={() => fireAddTaskLabel(color)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default LabelsDd;
