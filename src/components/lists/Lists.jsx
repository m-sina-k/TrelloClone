import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import SingleList from "./components/SingleList";
import AddNewList from "./components/AddNewList";

const Lists = () => {
  const { currentBoard } = useSelector((state) => state.boardsState);
  const { toolbarHeight } = useSelector((state) => state.uiState);

  return (
    // lists container
    <div className="lists-container flex overflow-x-auto mx-auto mt-1 pt-1.5 pb-10 px-5 gap-2">
      {currentBoard.lists.map((list, index) => (
        <motion.div
          key={list.id}
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
        >
          <SingleList list={list} key={list.id} />
        </motion.div>
      ))}
      <AddNewList />
    </div>
  );
};

export default Lists;
