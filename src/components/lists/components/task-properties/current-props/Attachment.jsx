import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  removeTaskAttachment,
  renameAttachment,
} from "features/slices/boardsSlice";
import { setPreviewerFile } from "features/slices/uiSlice";
import { useOnClickOutside } from "hooks/useClickOutside";
import { motion } from "framer-motion";
import DeleteAttach from "../available-props/components/DeleteProp";
import NameDd from "../available-props/components/NameDd";

import { MdOutlineAttachment } from "react-icons/md";
import { FiExternalLink, FiFileText } from "react-icons/fi";
import { GrDocumentPdf } from "react-icons/gr";

const Attachment = ({ task, setActiveDropdown }) => {
  const dispatch = useDispatch();
  const fireRemoveAttachment = (id) => {
    dispatch(removeTaskAttachment(id));
  };

  return (
    <motion.div
      className="flex mt-5 h-max"
      initial={{ opacity: 0,x:25 }}
      animate={{ opacity: 1,x:0 }}
      transition={{ delay:0.25,duration: 0.2 }}
    >
      <MdOutlineAttachment className="ml-3" size={22} />
      <section className="w-full">
        {/* heading */}
        <div className="flex">
          <h4>ضمیمه ها</h4>
        </div>
        {/* attachment item's */}
        <div className="py-2 mt-2">
          {task.attachList.map((attach) => {
            return attach.type === "link" ? (
              <a
                key={attach.id}
                href={attach.url}
                target="_blank"
                className="flex mb-1.5 transition-all duration-200 hover:bg-light px-1 py-1.5 rounded"
              >
                <div className="w-[110px] h-[80px] rounded bg-lightShade flex items-center justify-center ml-2">
                  <FiExternalLink size={24} />
                </div>
                <div style={{ width: `calc(100% - 110px)` }}>
                  <p className="text-sm">{attach.name}</p>
                  <ul className=" flex items-center mt-2 gap-1 text-textColor">
                    <DeleteAttach
                      btnText="حذف"
                      headingText="ضمیمه حذف شود؟"
                      setActiveDropdown={setActiveDropdown}
                      callback={() => fireRemoveAttachment(attach.id)}
                      btnUnderline
                      btnStyle="underline text-xs cursor-pointer hover:text-black"
                    />
                    |
                    <RenameAttachBtn
                      attach={attach}
                      setActiveDropdown={setActiveDropdown}
                    />
                  </ul>
                </div>
              </a>
            ) : (
              <section
                className="child flex transition-all duration-300 mb-1.5 px-1 py-1.5 rounded hover:bg-light"
                key={attach.id}
              >
                <div className="w-[110px] h-[80px] rounded bg-lightShade flex items-center justify-center ml-2 ">
                  {attach.type === "image" ? (
                    <img
                      src={attach.file}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : attach.type === "pdf" ? (
                    <GrDocumentPdf size={24} />
                  ) : (
                    <FiFileText size={24} />
                  )}
                </div>
                <div style={{ width: `calc(100% - 110px)` }}>
                  <p className="text-sm">{attach.name}</p>
                  <ul className=" flex items-center mt-2 gap-1 text-textColor">
                    <DeleteAttach
                      btnText="حذف"
                      headingText="ضمیمه حذف شود؟"
                      setActiveDropdown={setActiveDropdown}
                      callback={() => fireRemoveAttachment(attach.id)}
                      btnUnderline
                      btnStyle="underline text-xs cursor-pointer hover:text-black"
                    />
                    |
                    <RenameAttachBtn
                      attach={attach}
                      setActiveDropdown={setActiveDropdown}
                    />
                    |
                    {attach.type !== "link" && (
                      <li
                        className="underline text-xs cursor-pointer hover:text-black"
                        onClick={() => dispatch(setPreviewerFile(attach))}
                      >
                        پیش نمایش
                      </li>
                    )}
                    |
                    <li className="underline text-xs cursor-pointer hover:text-black">
                      <a href={attach.file} download={attach.name}>
                        دانلود
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

const RenameAttachBtn = ({ attach, setActiveDropdown }) => {
  const dispatch = useDispatch();
  const [attachName, setAttachName] = useState("");
  const [showRenameDd, setShowRenameDd] = useState(null);
  const toggleShowRenameDd = (e, id) => {
    e.preventDefault();
    if (showRenameDd === id) {
      setShowRenameDd(null);
      setActiveDropdown(false);
      setAttachName("");
    } else {
      setShowRenameDd(id);
      setActiveDropdown(true);
    }
  };
  const closeRenameDd = () => {
    if (showRenameDd) {
      setAttachName("");
      setActiveDropdown(null);
      setShowRenameDd(false);
    }
  };
  const renameDdRef = useRef();
  useOnClickOutside(renameDdRef, closeRenameDd);
  const submitAttachName = (id) => {
    dispatch(renameAttachment({ id, name: attachName }));
    closeRenameDd();
  };
  return (
    <li
      className="relative text-xs"
      ref={showRenameDd === attach.id ? renameDdRef : null}
    >
      <button
        className="underline hover:text-black"
        onClick={(e) => toggleShowRenameDd(e, attach.id)}
      >
        ویرایش نام
      </button>
      {showRenameDd === attach.id && (
        <NameDd
          headingTitle="ویرایش نام ضمیمه"
          labelText="نام ضمیمه"
          btnText="بروزرسانی"
          submitCallback={() => submitAttachName(attach.id)}
          inputValue={attachName}
          setInputValue={setAttachName}
          closeDd={closeRenameDd}
        />
      )}
    </li>
  );
};

export default Attachment;
