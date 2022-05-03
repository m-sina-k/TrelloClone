import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "features/slices/boardsSlice";
import { useOnClickOutside } from "hooks/useClickOutside";

import deleteSoundEffect from "assets/audio/delete-sound-effect.mp3";

import { CgClose } from "react-icons/cg";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteTask = ({ task, setActiveDropdown, closeTaskProperties }) => {
  const dispatch = useDispatch();
  const deleteBtnRef = useRef();
  const [showConfirm, setShowConfirm] = useState(false);
  useOnClickOutside(deleteBtnRef, () => {
    if (showConfirm) {
      setShowConfirm(false);
      setActiveDropdown(false);
    }
  });

  const fireDeleteTask = (id) => {
    setShowConfirm(false);
    dispatch(deleteTask(id));
    closeTaskProperties();
    // play delete sound effect when delete task
    const audio = new Audio(deleteSoundEffect);
    audio.play();
  };

  return (
    <li
      className="relative flex items-center rounded-sm mb-2 text-sm"
      ref={deleteBtnRef}
    >
      <section
        className="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-red-600 text-white hover:bg-red-700"
        onClick={() => {
          setShowConfirm(!showConfirm);
          setActiveDropdown(true);
        }}
      >
        <FaRegTrashAlt
          size={18}
          className="ml-2"
          onClick={() => setShowConfirm(false)}
        />
        <span>حذف این کار</span>
      </section>
      {showConfirm && (
        <div className="absolute z-10 top-[120%] left-0 min-w-[250px] p-2 rounded shadow-md bg-white">
          <section className="flex items-center justify-between pb-1.5 border-b-2 border-light">
            <h6 className="text-sm text-black">کار حذف شود؟</h6>
            <CgClose
              size={15}
              className="cursor-pointer"
              onClick={() => {
                setShowConfirm(false);
                setActiveDropdown(false);
              }}
            />
          </section>
          <div className="mt-2">
            <p className="text-xs text-textColor">
              در صورت حذف امکان بازیابی وجود ندارد.
            </p>
            <button
              className="rounded shoadow text-white bg-red-600 w-full text-xs mt-2 py-1.5 hover:bg-red-700"
              onClick={() => fireDeleteTask(task.id)}
            >
              حذف
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default DeleteTask;
