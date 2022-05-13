import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTaskDate, removeTaskDate } from "features/slices/boardsSlice";
import { Calendar, DateObject } from "react-multi-date-picker";
import persianCalendar from "react-date-object/calendars/persian";
import persianLang from "react-date-object/locales/persian_fa";
import TimePicker from "react-time-picker";
import { CgClose } from "react-icons/cg";

const DateDd = ({ task, closeDd }) => {
  const dispatch = useDispatch();
  const today = new DateObject({ calendar: persianCalendar });
  const tomorrow = new DateObject({ calendar: persianCalendar }).add(1, "days");
  const [calendarValue, setCalendarValue] = useState(tomorrow.format());
  const [calendarRange, setCalendarRange] = useState([
    today.format(),
    tomorrow.format(),
  ]);
  const [isRangeModeActive, setIsRangeModeActive] = useState(false);

  const defaultTime = task.date?.time || `${today.hour.toString()}:${
    today.minute < 10 ? "0" + today.minute.toString():today.minute.toString()
  }`;
  const [date, setDate] = useState({
    days: null,
    type: null,
    time: defaultTime,
  });

  useEffect(() => {
    // set default date
    setDate({ ...date, days: calendarValue, type: "single" });
    if (task.date) {
      if (task.date?.type === "range") {
        const startDate = task.date.days[0];
        const finishDate = task.date.days[1];
        setIsRangeModeActive(true);
        setCalendarRange([startDate, finishDate]);
        setDate({ days: [startDate, finishDate], type: "range",time:task.date.time });
        
      } else {
        setIsRangeModeActive(false);
        setCalendarValue(task.date.days);
        setDate({days: task.date.days, type: "single",time:task.date.time });
      }
    }
  }, []);

  const fireRemoveTaskDate = () => {
    dispatch(removeTaskDate());
    closeDd();
  };

  const handleDateSubmit = () => {
    dispatch(addTaskDate(date));
    closeDd();
  };

  const handleRangeChane = (value) => {
    if (value.length > 1) {
      const startDate = value[0].format();
      const finishDate = value[1].format();
      setCalendarRange([startDate, finishDate]);
      setDate({ ...date, days: [startDate, finishDate], type: "range" });
    }
  };
  const handleDateChange = (value) => {
    const formatedDate = value.format();
    setCalendarValue(formatedDate);
    if (date.time) setDate({ ...date, days: formatedDate, type: "single" });
    else setDate({ ...date, time: defaultTime });
  };
  return (
    <div className="absolute z-10 top-[50%] translate-y-[-50%] right-0 min-w-[250px] p-2 rounded shadow-md bg-white">
      {/* heading */}
      <section className="flex items-center justify-between pb-1.5 border-b-2 border-light mb-1">
        <h6 className="text-sm text-black">تاریخ</h6>
        <CgClose size={15} className="cursor-pointer" onClick={closeDd} />
      </section>
      {/* calendar */}
      {isRangeModeActive ? (
        <Calendar
          range
          value={calendarRange}
          calendar={persianCalendar}
          locale={persianLang}
          shadow={false}
          className="border-0"
          onChange={(date) => handleRangeChane(date)}
        />
      ) : (
        <Calendar
          value={calendarValue}
          calendar={persianCalendar}
          locale={persianLang}
          shadow={false}
          className="border-0"
          onChange={(date) => handleDateChange(date)}
        />
      )}
      {/* submit section */}
      <div className="mt-3">
        {/* start date */}
        <section className="flex flex-col justify-center mb-2">
          <label className="text-xs mb-1.5 text-textColor">زمان شروع</label>
          <section className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer ml-2"
              checked={isRangeModeActive}
              onChange={() => setIsRangeModeActive(!isRangeModeActive)}
            />
            <span
              className="py-1 px-4 rounded bg-light text-black text-sm min-w-[100px] 
              text-center "
            >
              {isRangeModeActive && calendarRange ? calendarRange[0] : "-"}
            </span>
          </section>
        </section>
        {/* finish date */}
        <div className="flex items-center gap-2 mt-5">
          <section className="flex flex-col justify-center mb-2">
            <label className="text-xs mb-1.5 text-textColor">زمان پایان</label>
            <section className="flex items-center gap-1">
              <span className="py-1 px-4 rounded bg-light text-black text-sm">
                {isRangeModeActive && calendarRange
                  ? calendarRange[1]
                  : calendarValue
                  ? calendarValue
                  : null}
              </span>
            </section>
          </section>
          <section className="flex flex-col justify-center mb-2">
            <label className="text-xs mb-1.5 text-textColor">ساعت</label>
            <div className="ltr font-vazir">
              <TimePicker
                value={date.time}
                onChange={(value) => setDate({ ...date, time: value })}
                clearIcon={null}
                clockIcon={null}
                disableClock
                format="HH:mm"
                className="py-0.5 px-0 rounded bg-light text-black text-sm text-center"
              />
            </div>
          </section>
        </div>
        <button
          onClick={handleDateSubmit}
          className="rounded mt-2 py-1.5 bg-primaryTint transition-all duration-200 text-sm text-white w-full hover:bg-primary"
        >
          ذخیره
        </button>
        {task.date && (
          <button
            className="rounded mt-1 py-1.5 bg-red-100 transition-all duration-200 text-sm text-red-600 w-full hover:bg-red-200"
            onClick={fireRemoveTaskDate}
          >
            حذف
          </button>
        )}
      </div>
    </div>
  );
};
export default DateDd;
