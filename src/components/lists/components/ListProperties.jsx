import { useDispatch } from "react-redux";
import { setAlertConfig, setShowBackdrop } from "features/slices/uiSlice";

import { FaRegTrashAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const ListProperties = ({ listID, listName, setShowPropertiesList }) => {
  const dispatch = useDispatch();

  const showConfirmAlert = (listName, listID) => {
    setShowPropertiesList(false);
    dispatch(setShowBackdrop(true));
    dispatch(
      setAlertConfig({
        message: `آیا از حذف لیست "${listName}" اطمینان دارید ؟`,
        isActive: true,
        callback: { name: "CONFIRM_DELETE_LIST", payload: listID },
      })
    );
  };

  return (
    <div className="absolute text-textColor top-[100%] z-30 min-w-[250px] right-0 p-1.5 rounded shadow bg-white">
      <ul>
        {/* list properties heading */}
        <li className="flex items-center justify-between text-sm mb-1.5 py-[10px] px-1 border-b-2 border-light text-center">
          <span>اقدامات لیست</span>
          <CgClose
            size={18}
            className="cursor-pointer hover:text-black"
            onClick={() => setShowPropertiesList(false)}
          />
        </li>
        {/* list delete button */}
        <li
          className="flex items-center text-xs py-1.5 px-3 mb-1.5 rounded transition-all duration-200 cursor-pointer hover:bg-red-50 hover:text-black"
          onClick={() => showConfirmAlert(listName, listID)}
        >
          <FaRegTrashAlt size={16} className="text-red-700" />
          <span className="mr-2">حذف لیست</span>
        </li>
      </ul>
    </div>
  );
};

export default ListProperties;
