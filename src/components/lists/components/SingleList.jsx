import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUpdatingListInfo,
  updateListName,
} from "features/slices/boardsSlice";
import { motion } from "framer-motion";
import { useOnClickOutside } from "hooks/useClickOutside";
import AddTask from "./AddTask";
import ListProperties from "./ListProperties";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";


const SingleList = ({ list }) => {
  const { updatingListInfo } = useSelector(
    (state) => state.boardsState
  );
  const dispatch = useDispatch();
  const listNameInputRef = useRef();
  const [newListName, setNewListName] = useState(list.name);

  const selectListName = () => {
    listNameInputRef.current.select();
  };

  const changeListName = () => {
    if (newListName.trim() !== "") {
      dispatch(setUpdatingListInfo({ type: "updateName", id: list.id }));
      dispatch(updateListName(newListName));
    } else {
      setNewListName(list.name);
    }
  };

  const inputEnter = (e) => {
    if (e.keyCode === 13) listNameInputRef.current.blur();
  };

  const [showPropertiesList, setShowPropertiesList] = useState(false);
  const propertiesListRef = useRef();
  useOnClickOutside(propertiesListRef, () => setShowPropertiesList(false));

  return (
    <article className="rounded shadow bg-light py-2 pr-3 pl-2 h-max min-w-[285px]">
      {/* list heading */}
      <section className="flex items-center justify-between pb-2 border-lightShade border-b-2 mb-2">
        <input
          value={newListName}
          ref={listNameInputRef}
          onClick={selectListName}
          className="text-sm w-full bg-transparent rounded p-[3px] border-2 focus:border-blue-700 focus:bg-white"
          onChange={(e) => setNewListName(e.target.value)}
          onBlur={changeListName}
          onKeyUp={inputEnter}
        />

        {/* list property relative container */}
        <section className="relative inline-flex" ref={propertiesListRef}>
          <span
            className=" cursor-pointer p-1 transition-all duration-100 rounded hover:bg-lightShade"
            onClick={() => setShowPropertiesList(!showPropertiesList)}
          >
            <BiDotsHorizontalRounded />
          </span>
          {showPropertiesList && (
            <ListProperties
              listID={list.id}
              setShowPropertiesList={setShowPropertiesList}
            />
          )}
        </section>
      </section>

      {/* list items */}
      <ul>
        {list.items.map((item) => (
          <motion.li
            key={item.id}
            className="relative flex items-center justify-between overflow-hidden rounded mb-1.5 shadow-sm text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={item.title}
              onChange={() => {}}
              className="bg-bgColor p-1.5 h-full flex-1 text-textColor"
            />
            <span className="absolute z-10 top-1 left-1 cursor-pointer p-1.5 transition-all duration-100 rounded hover:bg-light">
              <FiEdit size={12} />
            </span>
          </motion.li>
        ))}
      </ul>

      {list.id === updatingListInfo?.id &&
      updatingListInfo?.type === "addTask" ? (
        <AddTask />
      ) : (
        <button
          className="mt-2 flex items-center text-sm p-1.5 w-full rounded transition-all duration-200 text-textColor hover:bg-lightShade hover:text-black"
          onClick={() =>
            dispatch(setUpdatingListInfo({ type: "addTask", id: list.id }))
          }
        >
          <span className="ml-1">
            <HiPlus size={18} />
          </span>
          <span>افزودن کار جدید</span>
        </button>
      )}
    </article>
  );
};

export default SingleList;
