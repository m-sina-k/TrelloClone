import { useRef } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { setActiveDropdown } from "features/slices/uiSlice";
import Dropdown from "components/Dropdown";

import { MdKeyboardArrowDown } from "react-icons/md";

const ToolbarButton = ({
  icon: Icon,
  text,
  additionalClass,
  dropdown,
  callback,
}) => {
  const { activeDropdown } = useSelector((state) => state.uiState);
  const dispatch = useDispatch();

  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => dispatch(setActiveDropdown(null)));

  return dropdown ? (
    <section ref={dropdownRef}>
      {/* relative container */}
      <section className="relative flex items-center">
        {/* dropdown button */}
        <span
          className={`toolbar-button py-2 ${
            additionalClass ? additionalClass : ""
          }`}
          data-dropdown={dropdown}
          onClick={(e) =>
            dispatch(setActiveDropdown(e.currentTarget.dataset.dropdown))
          }
        >
          {Icon && <Icon size={18} className="ml-1" />}
          <span>{text}</span>
          <MdKeyboardArrowDown
            size={18}
            className={`mr-1 transition-all duration-200 ${
              activeDropdown === dropdown ? "rotate-180" : ""
            }`}
          />
        </span>
        {/* dropdown component */}
        {activeDropdown === dropdown && <Dropdown type="boards" />}
      </section>
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
