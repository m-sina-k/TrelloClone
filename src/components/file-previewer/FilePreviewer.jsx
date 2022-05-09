import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPreviewerFile } from "features/slices/uiSlice";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { CgClose } from "react-icons/cg";

const FilePreviewer = ({ attach }) => {
  const dispatch = useDispatch();
  const closePreviewr = () => dispatch(setPreviewerFile(null));

  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // read txt file content
  const [textFileContent, setTextFileContent] = useState("");
  const readTxtFile = () => {
    if (attach.type === "text") {
      const encodedFile = atob(attach.file.split(",")[1]);
      const decodedFile = decodeURIComponent(escape(encodedFile));
      setTextFileContent(decodedFile);
    }
  };

  useEffect(() => {
    readTxtFile();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.85)] z-50 overflow-auto">
      {/* close button */}
      <button
        className="fixed top-5 right-5 text-[rgba(255,255,255,0.5)] hover:text-white"
        onClick={closePreviewr}
      >
        <CgClose size={34} />
      </button>
      {/*image file previewer */}
      {attach.type === "image" ? (
        <figure className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[80%] bg-white rounded p-1.5">
          <img src={attach.file} className="rounded-lg shadow object-cover" />
        </figure>
      ) : attach.type === "pdf" ? (
        // pdf file previewer
        <Document
          file={attach.file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="absolute top-0 left-[50%] translate-x-[-50%]"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        // text file preview
        <div className="absolute top-[25%] left-[50%] translate-x-[-50%] bg-white rounded p-3">
          <p className="text-black">
            {textFileContent ? textFileContent : null}
          </p>
        </div>
      )}
      <p className="fixed bottom-0 w-full py-4 text-center text-white text-lg bg-[rgba(0,0,0,0.85)]">
        {attach.name}
      </p>
    </div>
  );
};

export default FilePreviewer;
