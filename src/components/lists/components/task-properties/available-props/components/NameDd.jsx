import { useState, useEffect } from "react";

import { CgClose } from "react-icons/cg";

const NameDd = ({
  headingTitle,
  labelText,
  btnText,
  submitCallback,
  inputValue,
  setInputValue,
  closeDd
}) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (inputValue.trim() !== "") setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  }, [inputValue]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitCallback();
  };
  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      action="#"
      className="absolute top-[105%] right-[20%] min-w-[200px] p-2 bg-white rounded z-50 shadow"
    >
      <section className="flex items-center justify-between pb-1.5 border-b-2 border-light mb-1.5">
        <h6 className="text-sm text-black">{headingTitle}</h6>
        <CgClose size={15} className="cursor-pointer" onClick={closeDd} />
      </section>
      <label htmlFor="new-board-name-input" className="text-xs mb-1.5 block">
        {labelText} :
      </label>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        name="new-board-name-input"
        autoFocus
        className="rounded border-2 border-blue-700 text-sm w-full py-1 px-2.5"
      />

      <button
        disabled={isSubmitDisabled}
        type="submit"
        className="py-1.5 px-3 mt-1.5 transition-all duration-150 bg-primaryTint hover:bg-primary text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {btnText}
      </button>
    </form>
  );
};

export default NameDd;
