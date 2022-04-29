import { useState, useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import Dropdown from "components/toolbar/dropdown";

import { MdKeyboardArrowDown } from "react-icons/md";

const ToolbarButton = ({
  icon: Icon,
  text,
  additionalClass,
  dropdown,
  callback,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  return dropdown ? (
    <section className="relative flex items-center" ref={dropdownRef}>
      {/* dropdown button */}
      <span
        className={`toolbar-button py-2 ${
          additionalClass ? additionalClass : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {Icon && <Icon size={18} className="ml-1" />}
        <span>{text}</span>
        <MdKeyboardArrowDown
          size={18}
          className={`mr-1 transition-all duration-200 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </span>
      {/* dropdown component */}
      {showDropdown && <Dropdown type={dropdown} setShowDropdown={setShowDropdown} />}
    </section>
  ) : (
    <span
      className={`toolbar-button ${additionalClass ? additionalClass : ""}`}
      onClick={callback ? callback : null}
    >
      {Icon && (
        // poineter event none : to prevent svg click
        <Icon size={18} className="ml-1" style={{ pointerEvents: "none" }} />
      )}
      {text}
    </span>
  );
};

export default ToolbarButton;
