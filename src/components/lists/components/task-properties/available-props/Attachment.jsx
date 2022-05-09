import { useState, useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import AttatchDd from "./components/AttatchDd";

import { MdOutlineAttachment } from "react-icons/md";

const Attachment = ({ task, setActiveDropdown }) => {
  const [showDd, setShowDd] = useState(false);
  const closeDd = () => {
    if (showDd) {
      setActiveDropdown(false);
      setShowDd(false);
    }
  };
  const attachBtnRef = useRef();
  useOnClickOutside(attachBtnRef, closeDd);
  return (
    <li
      className="relative flex items-center rounded-sm mb-1.5 text-sm"
      ref={attachBtnRef}
    >
      <section
        className="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-light text-textColor hover:bg-lightShade hover:text-black"
        onClick={() => {
          setShowDd(!showDd);
          setActiveDropdown(true);
        }}
      >
        <MdOutlineAttachment size={18} className="ml-2" />
        <span>ضمیمه ها</span>
      </section>
      {showDd && <AttatchDd closeDd={closeDd} />}
    </li>
  );
};

export default Attachment;
