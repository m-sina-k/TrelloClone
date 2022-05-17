import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateBoardName } from "features/slices/boardsSlice";

const BoardName = ({ boardName, setBoardName }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const measurer = useRef();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const EXTRA_SPACE = 15;

  useEffect(() => {
    setVisible(true);
  }, [boardName]);

  //   update input width when text changes
  useLayoutEffect(() => {
    if (visible && measurer?.current) {
      const rect = measurer.current.getBoundingClientRect();
      setWidth(rect.width + EXTRA_SPACE);
      setVisible(false);
    }
  }, [visible]);

  const selectText = () => {
    inputRef.current.select();
  };

  // update board name when user hit enter
  useEffect(() => {
    inputRef.current.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        inputRef.current.blur();
      }
    });
  }, []);

  const boardNameUpdate = () => {
    dispatch(updateBoardName(boardName));
  };

  return (
    <React.Fragment>
      <span ref={measurer}>{visible && boardName}</span>
        <input
          style={{ width: width }}
          type="text"
          name="borad-name"
          value={boardName}
          ref={inputRef}
          onChange={(e) => setBoardName(e.target.value)}
          className="board-name h-full font-vazirBold rounded w-auto px-1 min-w-[30px] text-sm  cursor-pointer bg-lightWhite text-white"
          onClick={selectText}
          onBlur={() => boardNameUpdate()}
        />
    </React.Fragment>
  );
};

export default BoardName;
