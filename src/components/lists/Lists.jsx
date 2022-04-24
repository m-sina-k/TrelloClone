import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import SingleList from "./components/SingleList";

const Lists = () => {
  const { currentBoard } = useSelector((state) => state.boardsState);
  return (
    // lists container
    <motion.div className="lists-container mx-auto mt-10 p-5">
      {currentBoard.lists.map((list,index) => (
        <motion.div
         
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5,delay:index * 0.7 }}
        >
          <SingleList list={list} key={list.id} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Lists;
