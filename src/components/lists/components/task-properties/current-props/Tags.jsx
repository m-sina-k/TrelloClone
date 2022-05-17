import { useState, useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import { motion } from "framer-motion";
import LabelsDd from "../available-props/components/LabelsDd";

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
      if (task.labels?.indexOf(showLabelsDd) === -1) {
        console.log("goch ya!");
      }
    }
  });
  useOnClickOutside(addLabelBtnRef, () => {
    if (showLabelsDd === "add-button") {
      setShowLabelsDd(null);
      setActiveDropdown(false);
    }
  });
  const closeDd = () => {
    setShowLabelsDd(null);
    setActiveDropdown(false);
  };
  return (
    <motion.div
      className="mt-2 mb-5 flex"
      initial={{ opacity: 0,x:25 }}
      animate={{ opacity: 1,x:0 }}
      transition={{ delay:0.1,duration: 0.2 }}
    >
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
                  closeDd={closeDd}
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
                showLabelsDd={showLabelsDd}
                closeDd={closeDd}
                setActiveDropdown={setActiveDropdown}
              />
            )}
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Tags;
