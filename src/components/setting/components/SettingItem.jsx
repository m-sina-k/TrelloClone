import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const SettingItem = ({
  icon: Icon,
  text,
  tab,
  setActiveSettingTab,
  subCategories,
}) => (
  <li
    onClick={(e) => setActiveSettingTab(e.currentTarget.dataset.tab)}
    data-tab={tab}
    className="flex items-center py-1.5 pl-3 pr-1 mb-1 rounded bg-whiteHover cursor-pointer"
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white p-2">
      <Icon size={28} />
    </span>
    <p className="mr-2 text-textColor">{text}</p>
    {subCategories && (
      <MdKeyboardArrowLeft size={20} className="bg-white rounded mr-auto" />
    )}
  </li>
);

export const SettingItemHeading = ({ icon: Icon, text }) => {
  return (
    <li className="flex items-center py-1.5 border-b-2 border-whiteHover col-span-full my-2">
      <Icon size={20} />
      <span className="mr-2">{text}</span>
    </li>
  );
};

export const SubcategoryHeading = ({ text, setActiveSettingTab }) => {
  const backToMainTab = (e) => {
    //  bubbling makes sidebar close due to useDetectClickOutside
    e.stopPropagation();
    setActiveSettingTab("main");
  };
  return (
    <h3 className="text-lg flex items-center p-4 bg-dark text-white">
      <MdKeyboardArrowRight
        size={24}
        className="ml-2 bg-darkTint rounded cursor-pointer back-button"
        onClick={(e) => backToMainTab(e)}
      />
      {text}
    </h3>
  );
};

export default SettingItem;
