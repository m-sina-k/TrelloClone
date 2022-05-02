import { useEffect } from "react";
import { useSelector } from "react-redux";

import Toolbar from "components/toolbar/Toolbar";
import Setting from "components/setting/Setting";
import Lists from "components/lists/Lists";
import Backdrop from "components/Backdrop";
import Alert from "components/Alert";
import TaskProperties from "components/lists/components/task-properties";

export default function App() {
  const { showSettingSidebar, activeBackground, showBackdrop } = useSelector(
    (state) => state.uiState
  );
  const { editingTask } = useSelector((state) => state.boardsState);

  useEffect(() => {
    if (activeBackground.type === "color")
      document.body.style.background = activeBackground.value;
    else
      document.body.style.background = `url(${activeBackground.value}) center center no-repeat`;
  }, [activeBackground]);

  return (
    <div
      className={`App transition-all duration-300 ${
        showSettingSidebar ? "ml-[320px]" : ""
      }`}
    >
      <Alert />
      <Backdrop isActive={showBackdrop} />
      <Toolbar />
      <Setting />
      <Lists />
      {editingTask?.id && <TaskProperties />}
    </div>
  );
}
