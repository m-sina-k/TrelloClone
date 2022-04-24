import { useSelector } from "react-redux";
import SingleList from "./components/SingleList";

const Lists = () => {
  const { currentBoard } = useSelector((state) => state.boardsState);
  return (
    // lists container
    <div className="lists-container mx-auto mt-10 p-5">
      {currentBoard.lists.map((list) => (
        <SingleList list={list} key={list.id} />
      ))}
    </div>
  );
};

export default Lists;
