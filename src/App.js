import { useEffect } from "react";
import { useSelector } from "react-redux";

import Toolbar from "components/Toolbar";
import Setting from "components/setting/Setting";
import Lists from "components/lists/Lists";

export default function App() {
  const { showSettingSidebar, activeBackground } = useSelector(
    (state) => state.uiState
  );

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
      <Toolbar />
      <Setting />
      <Lists />
    </div>
  );
}
