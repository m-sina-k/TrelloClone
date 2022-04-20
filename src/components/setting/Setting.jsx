import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition } from "react-transition-group";
import { useDetectClickOutside } from "react-detect-click-outside";
import { setShowSettingSidebar } from "features/slices/uiSlice";
import SettingItem, { SubcategoryHeading } from "./components/SettingItem";
import AppearanceTab from "./AppearanceTab";

import { MdColorLens } from "react-icons/md";
import { HiVolumeUp, HiOutlineCog } from "react-icons/hi";

const Setting = () => {
  const dispatch = useDispatch();
  const { showSettingSidebar } = useSelector((state) => state.uiState);
  const [activeSettingTab, setActiveSettingTab] = useState("appearance");
  const SLIDE_ANIMATION_DURATION = 300;

  const closeSettingSidebar = (e) => {
    if (showSettingSidebar && !e.target.classList.contains("setting-button")) {
      dispatch(setShowSettingSidebar(false));
      setActiveSettingTab("main");
    }
  };

  const settingSidebarRef = useDetectClickOutside({
    onTriggered: closeSettingSidebar,
  });

  const defaultStyle = {
    transition: ` all ${SLIDE_ANIMATION_DURATION}ms linear`,
    opacity: 1,
    width: "100%",
  };

  const slideIn = {
    entering: { transform: "translateX(-100%)", opacity: 0.3 },
    entered: { transform: "translateX(0)", opacity: 1 },
    exiting: { transform: "translateX(100%)", opacity: 0.3 },
    exited: { transform: "translateX(100%)", opacity: 0 },
  };
  const slideOut = {
    entering: { transform: "translateX(100%)", opacity: 0.3 },
    entered: { transform: "translateX(0)", opacity: 1 },
    exiting: { transform: "translateX(-100%)", opacity: 0.3 },
    exited: { transform: "translateX(-100%)", opacity: 0 },
  };

  const renderSettingTabHeading = () => {
    switch (activeSettingTab) {
      case "main":
        return (
          <h3 className="text-lg flex items-center p-4 bg-dark text-white mb-5">
            <HiOutlineCog size={24} className="ml-2" />
            تنظیمات
          </h3>
        );
      case "appearance":
        return (
          <SubcategoryHeading
            text="تنظیمات ظاهری"
            setActiveSettingTab={setActiveSettingTab}
          />
        );
      case "audio":
        return (
          <SubcategoryHeading
            text="تنظیمات صدا"
            setActiveSettingTab={setActiveSettingTab}
          />
        );
    }
  };

  return (
    <aside
      className={`fixed max-h-full overflow-y-auto flex flex-col top-0 left-[-320px] w-80 h-full bg-bgColor overflow-hidden transition-all duration-300 ${
        showSettingSidebar ? "left-0" : ""
      }`}
      ref={settingSidebarRef}
    >
      {renderSettingTabHeading()}

      <div className="flex px-4">
        {/* main setting tab */}
        <Transition
          in={activeSettingTab === "main"}
          mountOnEnter
          unmountOnExit
          timeout={0}
        >
          {(state) => (
            <ul
              style={{
                ...defaultStyle,
                ...slideOut[state],
              }}
            >
              <SettingItem
                icon={MdColorLens}
                setActiveSettingTab={setActiveSettingTab}
                tab="appearance"
                text="تنظیمات ظاهری"
                subCategories
              />
              <SettingItem
                icon={HiVolumeUp}
                setActiveSettingTab={setActiveSettingTab}
                tab="audio"
                text="تنظیمات صدا"
                subCategories
              />
            </ul>
          )}
        </Transition>

        {/* appearance setting tab */}
        <Transition
          in={activeSettingTab === "appearance"}
          mountOnEnter
          unmountOnExit
          timeout={0}
        >
          {(state) => (
            <AppearanceTab
              style={{
                ...defaultStyle,
                ...slideIn[state],
              }}
            />
          )}
        </Transition>
      </div>
    </aside>
  );
};

export default Setting;
