import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { crateNewList } from "features/slices/boardsSlice";
import { useOnClickOutside } from "hooks/useClickOutside";
import { v4 as uuidv4 } from "uuid";

import { HiPlus } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";

const AddNewList = ({ listsLength }) => {
  const dispatch = useDispatch();
  const [showAddInput, setShowAddInput] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const addInputContainerRef = useRef();
  const addInputRef = useRef();

  useOnClickOutside(addInputContainerRef, () => setShowAddInput(false));

  const addListInputEnter = (e) => {
    if (e?.keyCode === 13) addNewList();
  };

  const addNewList = () => {
    if (newListTitle.trim() !== "") {
      const newList = {
        id: uuidv4(),
        name: newListTitle,
        items: [],
      };
      dispatch(crateNewList(newList));
      setNewListTitle("");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, delay: listsLength * 0.2 }}
      className="rounded shadow bg-whiteHover min-w-[285px] h-max"
    >
      {showAddInput ? (
        <section className="py-3 px-2" ref={addInputContainerRef}>
          {/* add list input */}
          <input
            type="text"
            placeholder="نام لیست جدید را وارد کنید..."
            className="bg-white rounded shadow-sm  w-full p-2.5 mb-2 text-xs border-2 focus:border-blue-700"
            autoFocus
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            ref={addInputRef}
            onKeyUp={(e) => addListInputEnter(e)}
          />
          {/* button container */}
          <section className="flex items-center">
            <button
              className="py-1 px-3.5 text-white text-sm rounded shadow-sm text-center bg-primaryTint transition-all duration-200 hover:bg-primary"
              onClick={addNewList}
            >
              افزودن
            </button>
            <button
              className="mr-1 rounded p-1 transition-all duration-200 text-textColor hover:bg-lightShade hover:text-black"
              onClick={() => setShowAddInput(false)}
            >
              <RiCloseFill size={20} />
            </button>
          </section>
        </section>
      ) : (
        <section
          className="flex items-center py-3 px-2 cursor-pointer"
          onClick={() => setShowAddInput(true)}
        >
          {/* add list button */}
          <HiPlus size={20} />
          <span className="text-sm mr-2">افزودن لیست جدید</span>
        </section>
      )}
    </motion.article>
  );
};

export default AddNewList;
