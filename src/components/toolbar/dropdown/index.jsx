import { motion, AnimatePresence } from "framer-motion";
import BoardsList from "./BoardsList";
import NewBoardDd from "./NewBoardDd";

const Dropdown = ({ type, setShowDropdown }) => {
  const renderDropdown = () => {
    switch (type) {
      case "boards":
        return <BoardsList setShowDropdown={setShowDropdown}/>;
      case "createBoard":
        return <NewBoardDd setShowDropdown={setShowDropdown} />;
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.93, 1] }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
        className="z-50 absolute top-10 right-0 w-60 p-1.5 rounded-lg bg-bgColor text-textColor shadow-lg"
      >
        {renderDropdown()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Dropdown;
