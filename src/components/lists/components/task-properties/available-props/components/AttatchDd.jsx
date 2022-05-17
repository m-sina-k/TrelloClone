import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { uploadTaskAttachment } from "features/slices/boardsSlice";

import { CgClose } from "react-icons/cg";
import { FiUploadCloud } from "react-icons/fi";

const AttatchDd = ({ closeDd }) => {
  const dispatch = useDispatch();
  const attachLinkInputRef = useRef();
  const [attachUploadErr, setAttachUploadErr] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const FILE_TYPES = ["pdf", "txt", "png", "jpg", "jpeg"];
  const MAX_UPLOAD_SIZE = 3; //3mb

  const handleFileUpload = (file) => {
    setAttachUploadErr("");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const fileType = file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("text/")
      ? "text"
      : "pdf";
      const result = e.target.result;
      const fileAttach = {
        id: uuidv4(),
        name: file.name,
        file: result,
        type: fileType,
      };
      dispatch(uploadTaskAttachment(fileAttach));
      closeDd();
    });
  };

  const uploadAttachLink = (e) => {
    e.preventDefault();
    const httpsPattern = /^((http|https|ftp):\/\/)/;

    if (linkUrl.trim() !== "") {
      let url = linkUrl;
      if (!httpsPattern.test(linkUrl)) {
        url = "https://" + url;
      }
      const linkAttach = {
        id: uuidv4(),
        name: linkUrl,
        url,
        type: "link",
      };
      dispatch(uploadTaskAttachment(linkAttach));
      closeDd();
      setLinkUrl("");
    } else attachLinkInputRef.current.focus();
  };
  return (
    <div className="absolute z-10 top-[115%] right-0 min-w-[350px] p-2 rounded shadow-md bg-white">
      <section className="flex items-center justify-between pb-1.5 border-b-2 border-light">
        <h6 className="text-sm text-black">ضمیمه ها</h6>
        <CgClose size={15} className="cursor-pointer" onClick={closeDd} />
      </section>
      <div className="mt-2">
        <FileUploader
          multiple={false}
          handleChange={handleFileUpload}
          name="attach-upload-input"
          types={FILE_TYPES}
          onTypeError={() =>
            setAttachUploadErr(
              "فقط فایل های txt , pdf و انواع عکس ها قابل قبولند."
            )
          }
          label="برای آپلود کلیک یا فایل را دراپ کنید"
          hoverTitle="فایل را اینجا رها کنید!"
          maxSize={2}
          onSizeError={() =>
            setAttachUploadErr(
              `حداکثر حجم آپلود ${MAX_UPLOAD_SIZE} مگابایت است.`
            )
          }
          children={<Dropbox />}
        />
        {attachUploadErr && (
          <p className="text-red-500 text-center mt-1 text-sm">
            {attachUploadErr}
          </p>
        )}
        <form action="#" className="mt-2" onSubmit={(e) => uploadAttachLink(e)}>
          <section className="border-b-2 border-light pb-1 mb-1.5">
            <h6 className="text-xs text-black">ضمیمه کردن لینک</h6>
          </section>
          <input
            type="text"
            ref={attachLinkInputRef}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="آدرس لینک را وارد کنید..."
            autoFocus
            className="border-2  rounded-sm bg-transparent w-full focus:bg-light p-1.5 text-black text-sm focus:border-blue-600"
          />
          <button
            type="submit"
            className="mt-1.5 rounded-sm py-1 px-3 bg-blue-500 text-sm text-white hover:bg-blue-600"
          >
            ضمیمه
          </button>
        </form>
      </div>
    </div>
  );
};

const Dropbox = () => (
  <div className="border-dashed border-[3px] border-blue-700 rounded bg-blue-100 flex items-center justify-center p-2 cursor-pointer">
    <section className="text-blue-700 flex flex-col items-center">
      <FiUploadCloud size={32} />
      <p className="mt-2 max-w-[200px] text-center">
        برای آپلود در اینجا کلیک کنید یا فایل را درگ و دراپ نمایید.
      </p>
    </section>
  </div>
);

export default AttatchDd;
