import { useState, useRef } from "react";
import {
  toggleChecklistItemCompelete,
  deleteChecklistItem,
  editChecklistItem,
} from "features/slices/boardsSlice";
import { useDispatch } from "react-redux";
import { Line } from "rc-progress";

import { FaCheck, FaRegTrashAlt } from "react-icons/fa";

const ChecklistItems = ({ checklist, setActiveDropdown }) => {
  const checklistItemInputRef = useRef();
  const [editingItem, setEditingItem] = useState({
    itemId: null,
    itemTitle: null,
  });
  const fireEditChecklistItemEdit = () => {
    if (editingItem.itemTitle.trim() !== "") {
      dispatch(
        editChecklistItem({
          listId: checklist.id,
          itemId: editingItem.itemId,
          title: editingItem.itemTitle,
        })
      );
    }
    setActiveDropdown(false);
    setEditingItem({ itemId: null, itemTitle: null });
  };
  const dispatch = useDispatch();
  const COMPELETED_TASKS_COUNT = checklist.items.filter(
    (item) => item.isCompeleted
  ).length;
  const PROGRESS_PERCENT = Math.round(
    (100 * COMPELETED_TASKS_COUNT) / checklist.items.length
  );
  const PROGRESS_STROKE_COLOR = !PROGRESS_PERCENT
    ? "#e1e1e1"
    : PROGRESS_PERCENT < 60
    ? "#ff9f1a"
    : PROGRESS_PERCENT > 60 && PROGRESS_PERCENT < 100
    ? "#5ba4cf"
    : "#61bd4f";
  return (
    <div>
      {/* checklist progress bar */}
      <section className="flex items-center mb-1.5 gap-2.5">
        <span className="text-sm text-textColor">
          {PROGRESS_PERCENT ? PROGRESS_PERCENT : 0}%
        </span>
        <Line
          percent={PROGRESS_PERCENT}
          strokeWidth={2}
          strokeColor={PROGRESS_STROKE_COLOR}
          trailWidth={2}
        />
      </section>
      {/* checklist item's */}
      <ul>
        {checklist.items.map((item) => (
          <li
            key={item.id}
            className="group flex items-center rounded py-0.5 px-2 hover:bg-light"
          >
            <button
              className={`${
                item.isCompeleted ? "bg-green-600 text-white" : "border-2"
              } border-[#9b9b9b] flex items-center justify-center rounded overflow-hidden bg-white w-4 h-4 ml-2`}
              onClick={() =>
                dispatch(
                  toggleChecklistItemCompelete({
                    listId: checklist.id,
                    itemId: item.id,
                  })
                )
              }
            >
              {item.isCompeleted ? <FaCheck size={12} /> : null}
            </button>
            {editingItem.itemId === item.id ? (
              <input
                ref={checklistItemInputRef}
                type="text"
                value={editingItem.itemTitle}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    itemTitle: e.target.value,
                  })
                }
                className="bg-transparent text-sm p-1 rounded w-full ml-1.5 text-textColor focus:bg-white focus:border-2 focus:border-blue-600"
                autoFocus
                onBlur={fireEditChecklistItemEdit}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) checklistItemInputRef.current.blur();
                }}
              />
            ) : (
              <span
                className={`w-full p-1 ml-1.5 text-sm text-textColor ${
                  item.isCompeleted ? "line-through" : ""
                }`}
                onClick={() => {
                  setEditingItem({
                    itemId: item.id,
                    itemTitle: item.title,
                  });
                  setActiveDropdown(true);
                }}
              >
                {item.title}
              </span>
            )}
            <button
              className="hidden text-red-400 mr-auto hover:text-red-800 group-hover:block"
              onClick={() =>
                dispatch(
                  deleteChecklistItem({
                    listId: checklist.id,
                    itemId: item.id,
                  })
                )
              }
            >
              <FaRegTrashAlt size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistItems;
