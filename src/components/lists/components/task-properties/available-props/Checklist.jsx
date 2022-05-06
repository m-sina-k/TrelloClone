import { useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "hooks/useClickOutside";
import { addTaskChecklist } from "features/slices/boardsSlice";

import { CgClose } from "react-icons/cg";
import { FiCheckSquare } from "react-icons/fi";

const Checklist = ({ task, setActiveDropdown }) => {
    const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false);
  const [checklistName, setChecklistName] = useState("");

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (checklistName.trim() !== "") setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  }, [checklistName]);

  const closeDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      setActiveDropdown(false);
    }
  };

  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, closeDropdown);

  const addChecklistSubmit = (e) => {
    e.preventDefault();
    closeDropdown();
    const checklist = {
        name:checklistName,
        id:uuidv4(),
        items:[]
    }
    dispatch(addTaskChecklist({id:task.id,checklist}))
    setChecklistName('')
  };
  return (
    <li
      className="relative flex items-center rounded-sm mb-1.5 text-sm"
      ref={dropdownRef}
    >
      <section
        className="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-light text-textColor hover:bg-lightShade hover:text-black"
        onClick={() => {
          setShowDropdown(!showDropdown);
          setActiveDropdown(true);
        }}
      >
        <FiCheckSquare size={18} className="ml-2" />
        <span>چک لیست</span>
      </section>
      {showDropdown && (
        <form
          onSubmit={(e) => addChecklistSubmit(e)}
          action="#"
          className="absolute top-[105%] right-[20%] min-w-[200px] p-2 bg-white rounded z-50 shadow"
        >
          <section className="flex items-center justify-between pb-1.5 border-b-2 border-light mb-1.5">
            <h6 className="text-sm text-black">افزودن چک لیست</h6>
            <CgClose
              size={15}
              className="cursor-pointer"
              onClick={() => {
                setShowDropdown(false);
                setActiveDropdown(false);
              }}
            />
          </section>
          <label
            htmlFor="new-board-name-input"
            className="text-xs mb-1.5 block"
          >
            نام چک لیست :
          </label>
          <input
            value={checklistName}
            onChange={(e) => setChecklistName(e.target.value)}
            type="text"
            name="new-board-name-input"
            autoFocus
            className="rounded border-2 border-blue-700 text-sm w-full py-1 px-2.5"
          />

          <button
            disabled={isSubmitDisabled}
            type="submit"
            className="py-1.5 mt-1.5 transition-all duration-150 bg-primaryTint hover:bg-primary text-white w-full rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            افزودن چک لیست
          </button>
        </form>
      )}
    </li>
  );
};

export default Checklist;
