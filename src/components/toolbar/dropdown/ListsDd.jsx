import { useSelector, useDispatch } from "react-redux";
import { switchBoard } from "features/slices/boardsSlice";

const ListsDd = ({ setShowDropdown }) => {
  const dispatch = useDispatch();
  const { boards, currentBoard } = useSelector((state) => state.boardsState);
  const changeBoard = (id) => {
    dispatch(switchBoard(id));
    setShowDropdown(false);
  };
  return (
    <ul>
      {boards.map(({ id, name, avatarBg }) => (
        <li
          key={id}
          className={`flex items-center py-1.5 px-1 mb-1 rounded cursor-pointer hover:bg-whiteHover ${
            id === currentBoard.id ? "bg-light text-blue-700" : ""
          }`}
          onClick={() => changeBoard(id)}
        >
          <section
            className="font-vazirBold flex items-center justify-center text-lg rounded-md text-white w-8 h-8"
            style={{ background: avatarBg }}
          >
            {name.charAt(0)}
          </section>
          <p className="text-base mr-2">{name}</p>
        </li>
      ))}
    </ul>
  );
};

export default ListsDd;
