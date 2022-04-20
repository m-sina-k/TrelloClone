import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SettingItemHeading } from "./components/SettingItem";
import { changeThemeBackground } from "features/slices/uiSlice";

import { BiColorFill } from "react-icons/bi";
import { CgImage } from "react-icons/cg";
import { FiUploadCloud } from "react-icons/fi";

const AppearanceTab = ({ style }) => {
  const dispatch = useDispatch();
  const { themeColors, themeBackgrounds, activeBackground } = useSelector(
    (state) => state.uiState
  );

  const [fileTypeErr, setFileTypeErr] = useState("");
  const fileInputRef = useRef();

  const uploadBackgroundImage = () => {
    setFileTypeErr("");
    const reader = new FileReader();
    const fileInput = fileInputRef.current;
    if (
      fileInput &&
      fileInput.files &&
      fileInput.files[0].type.startsWith("image/")
    ) {
      reader.readAsDataURL(fileInputRef.current.files[0]);
      reader.addEventListener("load", (e) => {
        const image = e.target.result;
        dispatch(changeThemeBackground({ type: "image", value: image }));
      });
    } else {
      setFileTypeErr("فایل انتخاب شده تصویر نمی باشد!");
      return;
    }
  };

  return (
    <ul className="min-w-full grid grid-cols-2 gap-1" style={style}>
      {/* select background color */}
      <SettingItemHeading icon={BiColorFill} text="رنگ زمینه :" />
      {themeColors.map((color, index) => (
        <li
          key={index}
          className={`relative rounded h-9 cursor-pointer ${
            activeBackground.value === color ? "setting-option--active" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() =>
            dispatch(changeThemeBackground({ type: "color", value: color }))
          }
        ></li>
      ))}

      {/* select background image */}
      <SettingItemHeading icon={CgImage} text="تصویر زمینه :" />

      {themeBackgrounds.map((image, index) => (
        <li
          key={index}
          className={`relative rounded max-h-20 cursor-pointer overflow-hidden ${
            activeBackground.value === image ? "setting-option--active" : ""
          }`}
          onClick={() =>
            dispatch(changeThemeBackground({ type: "image", value: image }))
          }
        >
          <img
            src={image}
            alt={`تصویر زمینه ${index}`}
            className="relative h-full w-full "
          />
        </li>
      ))}

      {/* custom background image upload */}
      <SettingItemHeading icon={FiUploadCloud} text="بارگذاری تصویر دلخواه :" />
      <li className="col-span-full">
        {/* hide default browser file input and trigger it with a button */}
        <input
          type="file"
          className="hidden"
          name="custom-background"
          accept="image/*"
          ref={fileInputRef}
          onChange={uploadBackgroundImage}
        />
        <button
          type="button"
          className="w-full p-1.5 rounded bg-primaryTint text-white hover:bg-primary"
          onClick={() => fileInputRef.current.click()}
        >
          انتخاب تصویر
        </button>
        <small className="mt-2 block text-red-700">{fileTypeErr}</small>
      </li>
    </ul>
  );
};

export default AppearanceTab;
