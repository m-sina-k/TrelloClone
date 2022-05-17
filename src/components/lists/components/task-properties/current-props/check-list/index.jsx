import { useDispatch } from "react-redux";
import { deleteTaskChecklist } from "features/slices/boardsSlice";
import { motion } from "framer-motion";

import DeleteChecklist from "../../available-props/components/DeleteProp";
import ChecklistItems from "./ChecklistItems";
import Addbox from "./Addbox";

import { FiCheckSquare } from "react-icons/fi";

const Checklists = ({ task, setActiveDropdown }) => {
  const dispatch = useDispatch();
  return task.checklists.map((checklist) => {
    const fireDeleteChecklist = () => {
      dispatch(deleteTaskChecklist(checklist.id));
    };

    return (
      <motion.div
        className="flex mt-8 h-max"
        key={checklist.id}
        initial={{ opacity: 0,x:25 }}
      animate={{ opacity: 1,x:0 }}
      transition={{ delay:0.30,duration: 0.2 }}
      >
        <FiCheckSquare className="ml-3" size={22} />
        <section className="w-full">
          {/* heading */}
          <div className="flex justify-between">
            <h4>{checklist.name}</h4>
            <DeleteChecklist
              btnText="حذف"
              headingText={`${checklist.name} حذف شود؟`}
              setActiveDropdown={setActiveDropdown}
              callback={fireDeleteChecklist}
              btnStyle="py-1 px-4 text-xs bg-light rounded cursor-pointer text-textColor mr-2 hover:bg-lightShade hover:text-black"
            />
          </div>
          {/* items container */}
          <ChecklistItems
            checklist={checklist}
            setActiveDropdown={setActiveDropdown}
          />
          {/* add item section (add box) */}
          <Addbox checklist={checklist} setActiveDropdown={setActiveDropdown} />
        </section>
      </motion.div>
    );
  });
};

export default Checklists;
