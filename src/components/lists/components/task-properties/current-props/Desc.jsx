import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { useOnClickOutside } from "hooks/useClickOutside";
import { addTaskDesc } from "features/slices/boardsSlice";

import { BsCardText } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";

const Desc = ({ task, setActiveDropdown }) => {
  const dispatch = useDispatch();
  const descBoxRef = useRef();
  const [status, setStatus] = useState(task.desc ? "DESC_EXISTS" : null);
  const [taskDesc, setTaskDesc] = useState(task.desc || "");

  const showDescInput = () => {
    setActiveDropdown(true);
    setStatus("EDITING");
  };

  const hideDescInput = () => {
    if (status === "EDITING") {
      setActiveDropdown(false);
      submitTaskDesc();
    }
  };

  const cancelUpdatingDecs = () => {
    setActiveDropdown(false);
    setStatus(task.desc ? "DESC_EXISTS" : null);
    setTaskDesc(task.desc || "");
  };

  const submitTaskDesc = () => {
    if (taskDesc.trim() !== "") setStatus("DESC_EXISTS");
    else setStatus(null);
    dispatch(addTaskDesc({ id: task.id, desc: taskDesc }));
  };

  useOnClickOutside(descBoxRef, hideDescInput);

  return (
    <div className="flex mt-1 h-max">
      <BsCardText className="ml-3" size={22} />
      <section className="w-full">
        {/* heading */}
        <div className="flex">
          <h4>توضیحات</h4>
          {status === "DESC_EXISTS" && (
            <button
              className="py-1 px-4 text-xs bg-light rounded cursor-pointer text-textColor mr-2 hover:bg-lightShade hover:text-black"
              onClick={showDescInput}
            >
              ویرایش
            </button>
          )}
        </div>
        {status === "DESC_EXISTS" ? (
          <p className="mt-4 text-textColor text-sm">{taskDesc}</p>
        ) : status === "EDITING" ? (
          <div ref={descBoxRef}>
            <TextareaAutosize
              minRows={4}
              placeholder="توضیحات بیشتری در رابطه با این کار بنویسید..."
              className="w-full mt-2 text-sm bg-whiteHover rounded p-2 placeholder:text-[#4b4b4b]  border-2 
            focus:border-blue-700
          "
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              onFocus={(e) => e.target.select()}
              autoFocus
            />
            <section className="flex items-center mt-2">
              <button
                className="py-1 px-3.5 text-white text-sm rounded shadow-sm text-center bg-green-500 transition-all duration-200 hover:bg-green-600"
                onClick={hideDescInput}
              >
                ذخیره
              </button>
              <button
                className="mr-1 rounded p-1 transition-all duration-200 text-textColor hover:bg-lightShade hover:text-black"
                onClick={cancelUpdatingDecs}
              >
                <RiCloseFill size={20} />
              </button>
            </section>
          </div>
        ) : (
          <section
            className="w-full mt-2 text-sm bg-whiteHover rounded p-2 text-[#4b4b4b] h-11 cursor-pointer"
            onClick={showDescInput}
          >
            توضیحات بیشتری در رابطه با این کار بنویسید...
          </section>
        )}
      </section>
    </div>
  );
};

export default Desc;
