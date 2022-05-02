import TextareaAutosize from "react-textarea-autosize";

import { BsCardText } from "react-icons/bs";

const TaskCurrentProps = ({ task }) => {
  return (
    <div className="flex">
      <BsCardText className="ml-3" size={22} />
      <section className="w-full">
        <h4>توضیحات</h4>
        <TextareaAutosize
          minRows={2}
          placeholder="توضیحات بیشتری در رابطه با این کار بنویسید..."
          className="w-full mt-2 text-sm bg-whiteHover rounded p-2 placeholder:text-[#4b4b4b]"
        />
      </section>
    </div>
  );
};

export default TaskCurrentProps;
