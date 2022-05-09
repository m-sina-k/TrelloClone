import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "hooks/useClickOutside";
import { addTaskChecklist } from "features/slices/boardsSlice";
import NameDd from "./components/NameDd";

import { FiCheckSquare } from "react-icons/fi";

const Checklist = ({ task, setActiveDropdown }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [checklistName, setChecklistName] = useState("");

  const closeDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      setActiveDropdown(false);
    }
  };

  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, closeDropdown);

  const addChecklistSubmit = () => {
    closeDropdown();
    const checklist = {
      name: checklistName,
      id: uuidv4(),
      items: [],
    };
    dispatch(addTaskChecklist({ id: task.id, checklist }));
    setChecklistName("");
  };
  return (
    <li
      className="relative flex items-center rounded-sm mb-1.5 text-sm"
      ref={dropdownRef}
    >
      <button
        className="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-light text-textColor hover:bg-lightShade hover:text-black"
        onClick={() => {
          setShowDropdown(!showDropdown);
          setActiveDropdown(true);
        }}
      >
        <FiCheckSquare size={18} className="ml-2" />
        <span>چک لیست</span>
      </button>
      {showDropdown && (
        <NameDd
          headingTitle="افزودن چک لیست"
          labelText="نام چک لیست"
          btnText="افزودن"
          submitCallback={addChecklistSubmit}
          inputValue={checklistName}
          setInputValue={setChecklistName}
          closeDd={closeDropdown}
        />
      )}
    </li>
  );
};

export default Checklist;
