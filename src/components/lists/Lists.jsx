import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import SingleList from "./components/SingleList";
import AddNewList from "./components/AddNewList";

const Lists = () => {
  const { currentBoard } = useSelector((state) => state.boardsState);
  const { toolbarHeight } = useSelector((state) => state.uiState);

  return (
    // lists container
    <div className="horizontal-scrollbar flex overflow-x-auto mx-auto mt-1 py-1.5 px-5 gap-2" style={{height:`calc(100vh - ${toolbarHeight +5}px)`}}>
      {currentBoard.lists?.map((list, index) => (
        <motion.div
          key={list.id}
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <SingleList list={list} key={list.id} />
        </motion.div>
      ))}
      <AddNewList listsLength={currentBoard.lists?.length}/>
    </div>
  );
};

export default Lists;
