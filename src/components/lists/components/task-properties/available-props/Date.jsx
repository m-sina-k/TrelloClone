import { useState, useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import DateDd from "./components/DateDd";

import { AiOutlineClockCircle } from "react-icons/ai";

const Date = ({ task, setActiveDropdown }) => {
  const dateBtnRef = useRef();
  const [showDateDd, setShowDateDd] = useState(false);

  const closeDateDd = () => {
    if (showDateDd) {
      setShowDateDd(false);
      setActiveDropdown(false);
    }
  };

  useOnClickOutside(dateBtnRef, closeDateDd);

  return (
    <li
      className="relative flex items-center rounded-sm mb-1.5 text-sm"
      ref={dateBtnRef}
    >
      <section
        className="flex w-full py-1.5 px-2 rounded-sm cursor-pointer transition-all duration-200 bg-light text-textColor hover:bg-lightShade hover:text-black"
        onClick={() => {
          setShowDateDd(!showDateDd);
          setActiveDropdown(true);
        }}
      >
        <AiOutlineClockCircle size={18} className="ml-2" />
        <span>تاریخ</span>
      </section>
      {showDateDd && (
          <DateDd task={task} closeDd={closeDateDd}/>
      )}
    </li>
  );
};

export default Date;
