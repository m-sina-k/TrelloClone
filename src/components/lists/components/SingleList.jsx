import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUpdatingListInfo,
  updateListName,
} from "features/slices/boardsSlice";
import { useOnClickOutside } from "hooks/useClickOutside";

import AddTask from "./AddTask";
import ListProperties from "./ListProperties";
import TaskCard from "./TaskCard";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";

const SingleList = ({ list }) => {
  const { updatingListInfo, showListLength } = useSelector(
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
      dispatch(updateListName({name:newListName,id:list.id}));
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
    <article
      className="rounded shadow bg-light py-2 pr-3 pl-2 h-max min-w-[285px]"
    >
      {/* list heading */}
      <section className=" pb-2 border-lightShade border-b-2 mb-2">
        <div className="flex w-full">
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
              className="h-max cursor-pointer p-1 transition-all duration-100 rounded hover:bg-lightShade"
              onClick={() => setShowPropertiesList(!showPropertiesList)}
            >
              <BiDotsHorizontalRounded />
            </span>
            {showPropertiesList && (
              <ListProperties
                listID={list.id}
                listName={list.name}
                setShowPropertiesList={setShowPropertiesList}
              />
            )}
          </section>
        </div>
        {showListLength && (
          <small className="block text-textColor text-xs px-[3px] mt-1">
            {list.items.length} کار در این لیست
          </small>
        )}
      </section>
      {/* list items */}
      <ul>
        {list.items.map((item) => (
          <TaskCard key={item.id} item={item} list={list} />
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
