import { motion } from "framer-motion";

const Date = ({ task }) => {
  const { type, days, time } = task.date;
  return (
    <motion.div
      className="mt-2 mb-5 flex"
      initial={{ opacity: 0,x:25 }}
      animate={{ opacity: 1,x:0 }}
      transition={{ delay:0.15,duration: 0.2 }}
    >
      <div className="mr-8">
        <h6 className="text-xs text-textColor mb-2">تاریخ</h6>
        <p className="py-1 px-3 rounded shadow bg-light text-sm">
          {type === "single" ? days : days[0] + " لغایت " + days[1]} ساعت{" "}
          <span dir="ltr">{time}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Date;
