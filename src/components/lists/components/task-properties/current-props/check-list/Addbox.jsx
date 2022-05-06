import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addChecklistItem } from "features/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import { useOnClickOutside } from "hooks/useClickOutside";

import { RiCloseFill } from "react-icons/ri";

const Addbox = ({ checklist, setActiveDropdown }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [checklistItemText, setChecklistItemText] = useState("");
  const [showAddbox, setShowAddbox] = useState(null);

  const closeAddbox = () => {
    if (showAddbox) {
      setShowAddbox(null);
      setActiveDropdown(false);
    }
  };

  const addboxRef = useRef();
  useOnClickOutside(addboxRef, closeAddbox);

  // close addbox on input blur (if target is not submit button)
  const handleAddBoxClick = (e) => {
    if (e.target.dataset.click) return;
    else closeAddbox();
  };

  const addChecklistItemOnEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fireAddChecklistItem();
    }
  };

  const fireAddChecklistItem = (e) => {
    e?.preventDefault();
    if (checklistItemText.trim() !== "") {
      const checklistItem = {
        id: uuidv4(),
        title: checklistItemText,
        isCompeleted: false,
      };
      dispatch(addChecklistItem({ id: checklist.id, item: checklistItem }));
      setChecklistItemText("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="py-2">
      {showAddbox === checklist.id ? (
        <form
          action="#"
          onSubmit={(e) => fireAddChecklistItem(e)}
          onClick={(e) => handleAddBoxClick(e)}
          ref={addboxRef}
        >
          <TextareaAutosize
            ref={inputRef}
            data-click
            autoFocus
            minRows={2}
            placeholder="نام مورد جدید را وارد نمایید..."
            value={checklistItemText}
            onChange={(e) => setChecklistItemText(e.target.value)}
            onKeyDown={(e) => addChecklistItemOnEnter(e)}
            className="w-full p-1.5 rounded bg-white text-sm focus:border-blue-700 focus:border-2"
          />
          {/* button container */}
          <section className="flex items-center">
            <button
              data-click
              className="py-1 px-3.5 text-white text-sm rounded shadow-sm text-center bg-primaryTint transition-all duration-200 hover:bg-primary"
              onClick={(e) => fireAddChecklistItem(e)}
            >
              افزودن
            </button>
            <button className="mr-1 rounded p-1 transition-all duration-200 text-textColor hover:bg-lightShade hover:text-black">
              <RiCloseFill size={20} />
            </button>
          </section>
        </form>
      ) : (
        <button
          className="mt-2 rounded text-sm bg-blue-500 transition-all duration-200 py-1.5 px-3.5 text-white shadow hover:bg-blue-600"
          onClick={() => {
            setShowAddbox(checklist.id);
            setActiveDropdown(true);
          }}
        >
          افزودن مورد
        </button>
      )}
    </div>
  );
};

export default Addbox;
