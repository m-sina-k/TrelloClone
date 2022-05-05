import { useState, useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import LabelsDd from "./LabelsDd";

import { HiOutlineTag } from "react-icons/hi";

const Tags = ({ task, setActiveDropdown }) => {
  const lableBtnRef = useRef();
  const [showLabelDd, setShowLabelDd] = useState(false);

  useOnClickOutside(lableBtnRef, () => {
    if (showLabelDd) {
      setShowLabelDd(false);
      setActiveDropdown(false);
    }
  });

  return (
    <li
      className="relative flex items-center rounded-sm mb-1.5 text-sm"
      ref={lableBtnRef}
    >
      <section
        className="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-light text-textColor hover:bg-lightShade hover:text-black"
        onClick={() => {
          setShowLabelDd(!showLabelDd);
          setActiveDropdown(true);
        }}
      >
        <HiOutlineTag
          size={18}
          className="ml-2"
          onClick={() => setShowLabelDd(false)}
        />
        <span>برچسب ها</span>
      </section>
      {showLabelDd && (
        <LabelsDd
          task={task}
          closeDd={() => setShowLabelDd(!showLabelDd)}
          setActiveDropdown={setActiveDropdown}
        />
      )}
    </li>
  );
};

export default Tags;
