import { useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useOnClickOutside } from "hooks/useClickOutside";
import { addNewTask, setUpdatingListInfo } from "features/slices/boardsSlice";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";

import popSoundEffect from "assets/audio/write-sound-effect.mp3";
import { RiCloseFill } from "react-icons/ri";

const AddTask = () => {
  const dispatch = useDispatch();
  const {playAudio} = useSelector(state=>state.uiState)
  const addTaskTextboxRef = useRef();

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTaskRef = useRef();
  useOnClickOutside(addTaskRef, () => dispatch(setUpdatingListInfo(null)));

  const textAreaSubmit = (e) => {
    if (e.keyCode === 13) {
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
      if(playAudio){
        const audio = new Audio(popSoundEffect);
        audio.play();
      }
    }
  };

  return (
    <div ref={addTaskRef}>
      <TextareaAutosize
        type="text"
        placeholder="عنوان کار جدید..."
        className="bg-white rounded shadow-sm h-16 w-full p-2 mb-1 text-xs border-2 focus:border-blue-700"
        autoFocus
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        ref={addTaskTextboxRef}
        onKeyDown={(e) => textAreaSubmit(e)}
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
