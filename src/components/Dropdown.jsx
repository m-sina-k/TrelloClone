import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidV4 } from "uuid";

const Dropdown = ({ type }) => {
  const tempBoards = [
    {
      id: uuidV4(),
      name: "پروژه کاری",
      avatarLetter: "پ",
      avatarBgColor: "bg-pink-500",
    },
    {
      id: uuidV4(),
      name: "ورزش",
      avatarLetter: "و",
      avatarBgColor: "bg-amber-500",
    },
  ];
  

  const renderDropdown = () => {
    switch (type) {
      case "boards":
        return (
          <ul>
            {tempBoards.map(({ id, avatarLetter, name, avatarBgColor }) => (
              <li
                key={id}
                className="flex items-center py-1.5 px-1 mb-1 rounded cursor-pointer hover:bg-whiteHover"
              >
                <section
                  className={`font-vazirBold flex items-center justify-center text-lg rounded-md text-white w-8 h-8 ${avatarBgColor}`}
                >
                  {avatarLetter}
                </section>
                <p className="text-textColor text-base mr-2">{name}</p>
              </li>
            ))}

            <li className="flex pt-2 px-1 border-t-2 border-whiteHover">
              <button className="py-2 text-center bg-primaryTint hover:bg-primary text-white w-full rounded text-sm">
                افزودن تخته جدید
              </button>
            </li>
          </ul>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.93, 1] }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
        className="z-50 absolute top-10 right-0 w-60 p-1.5 rounded-lg bg-bgColor text-textColor shadow-lg"
      >
        {renderDropdown()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Dropdown;
