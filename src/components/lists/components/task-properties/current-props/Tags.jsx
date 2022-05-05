import { useState, useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import LabelsDd from "../available-props/LabelsDd";

import { HiPlus } from "react-icons/hi";

const Tags = ({ task, setActiveDropdown }) => {
  const [showLabelsDd, setShowLabelsDd] = useState(null);

  const toggleLabelDd = (e) => {
    const activeDdId = e.currentTarget.dataset.label;
    if (showLabelsDd === activeDdId) {
      setShowLabelsDd(null);
      setActiveDropdown(false);
    } else {
      setShowLabelsDd(activeDdId);
      setActiveDropdown(true);
    }
  };

  const labelBtnRef = useRef();
  const addLabelBtnRef = useRef();
  useOnClickOutside(labelBtnRef, () => {
    if (showLabelsDd) {
      setShowLabelsDd(null);
      setActiveDropdown(false);
    }
  });
  useOnClickOutside(addLabelBtnRef, () => {
    if (showLabelsDd === "add-button") {
      setShowLabelsDd(null);
      setActiveDropdown(false);
    }
  });
  return (
    <div className="mt-2 mb-5 flex">
      <div className="mr-8">
        <h6 className="text-xs text-textColor mb-2">برچسب ها</h6>
        <ul className="flex items-center gap-1.5">
          {task.labels.map((labelColor, index) => (
            <li
              ref={showLabelsDd === labelColor ? labelBtnRef : null}
              key={index}
              className="relative w-10 h-8 rounde"
            >
              <button
                style={{ background: labelColor }}
                data-label={labelColor}
                onClick={(e) => toggleLabelDd(e)}
                className="rounded w-10 h-8 cursor-pointer"
              ></button>
              {showLabelsDd === labelColor && (
                <LabelsDd
                showLabelsDd={showLabelsDd}
                  task={task}
                  closeDd={() => setShowLabelsDd(null)}
                  setActiveDropdown={setActiveDropdown}
                />
              )}
            </li>
          ))}
          <li
            className="relative rounded w-8 h-8 bg-light"
            ref={addLabelBtnRef}
          >
            <button
              data-label="add-button"
              className="w-full h-full rounded text-textColor flex items-center justify-center  hover:text-black hover:bg-lightShade"
              onClick={(e) => toggleLabelDd(e)}
            >
              <HiPlus size={18} />
            </button>

            {showLabelsDd === "add-button" && (
              <LabelsDd
                task={task}
                closeDd={() => setShowLabelsDd(null)}
                setActiveDropdown={setActiveDropdown}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tags;
