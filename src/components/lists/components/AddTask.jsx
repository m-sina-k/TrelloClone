import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "hooks/useClickOutside";
import { addNewTask, setUpdatingListInfo } from "features/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";

import writeSoundEffect from "assets/audio/write-wound-effect.wav";
import { RiCloseFill } from "react-icons/ri";

const AddTask = () => {
  const dispatch = useDispatch();
  const addTaskTextboxRef = useRef();

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTaskRef = useRef();
  useOnClickOutside(addTaskRef, () => dispatch(setUpdatingListInfo(null)));

  const textAreaSubmit = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      submitNewTask();
    }
  };

  const submitNewTask = () => {
    if (newTaskTitle.trim().length) {
      const newTask = {
        id: uuidv4(),
        title: newTaskTitle,
      };
      dispatch(addNewTask(newTask));
      setNewTaskTitle("");
      addTaskTextboxRef.current.focus();
      // play writing sound effect when add new task
      const audio = new Audio(writeSoundEffect);
      audio.play();
    }
  };

  return (
    <div ref={addTaskRef}>
      <textarea
        type="text"
        placeholder="عنوان کار جدید..."
        className="bg-white rounded shadow-sm h-16 w-full p-2 mb-1 text-xs border-2 focus:border-blue-700"
        autoFocus
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        ref={addTaskTextboxRef}
        onKeyUp={(e) => textAreaSubmit(e)}
      />
      {/* button container */}
      <section className="flex items-center">
        <button
          onClick={submitNewTask}
          className="py-1 px-3.5 text-white text-sm rounded shadow-sm text-center bg-primaryTint transition-all duration-200 hover:bg-primary"
        >
          افزودن
        </button>
        <button
          className="mr-1 rounded p-1 transition-all duration-200 text-textColor hover:bg-lightShade hover:text-black"
          onClick={() => dispatch(setUpdatingListInfo(null))}
        >
          <RiCloseFill size={20} />
        </button>
      </section>
    </div>
  );
};

export default AddTask;
