import { useSelector, useDispatch } from "react-redux";
import {setUpdatingListID } from "features/slices/boardsSlice";
import AddTask from "./AddTask";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";

const SingleList = ({ list }) => {
  const { updatingListID } = useSelector((state) => state.boardsState);
  const dispatch = useDispatch();

  return (
    <article className="rounded shadow bg-light py-2 pr-3 pl-2 h-max">
      {/* list heading */}
      <section className="flex items-center justify-between pb-2 border-lightShade border-b-2 mb-2">
        <p className="text-sm">{list.name}</p>
        <span className="cursor-pointer p-1 transition-all duration-100 rounded hover:bg-lightShade">
          <BiDotsHorizontalRounded />
        </span>
      </section>

      {/* list items */}
      <ul>
        {list.items.map((item) => (
          <li
            key={item.id}
            className="relative flex items-center justify-between overflow-hidden rounded mb-1.5 shadow-sm text-sm"
          >
            <input
              type="text"
              value={item.title}
              onChange={() => {}}
              className="bg-white p-1.5 h-full flex-1 text-textColor"
            />
            <span className="absolute z-10 top-1 left-1 cursor-pointer p-1.5 transition-all duration-100 rounded hover:bg-light">
              <FiEdit size={12} />
            </span>
          </li>
        ))}
      </ul>

      {list.id === updatingListID && <AddTask />}

      {/* add new task */}
      {!(list.id === updatingListID) && (
        <button
          className="mt-2 flex items-center text-sm p-1.5 w-full rounded transition-all duration-200 text-textColor hover:bg-lightShade hover:text-black"
          onClick={() => dispatch(setUpdatingListID(list.id))}
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
