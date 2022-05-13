import { useDispatch, useSelector } from "react-redux";
import { togglePlayAudio } from "features/slices/uiSlice";

const AudioTab = () => {
  const dispatch = useDispatch();
  const { playAudio } = useSelector((state) => state.uiState);
  return (
    <li className="mt-5 w-full flex items-center justify-between py-1.5 pl-3 pr-1 mb-1 rounded bg-whiteHover cursor-pointer">
      <p className="mr-2 text-textColor">پخش افکت های صوتی</p>
      <section
        className={`switch-button ${playAudio ? "switch-button--active" : ""}`}
        onClick={() => dispatch(togglePlayAudio())}
      >
        <span className="circle"></span>
      </section>
    </li>
  );
};

export default AudioTab;
