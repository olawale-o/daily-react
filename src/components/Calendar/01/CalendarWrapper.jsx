import { useState } from "react";

import { eachDayOfInterval, endOfMonth, format, startOfMonth, getDay, getDate } from "date-fns";

import { DAYS_OF_THE_WEEK } from "../constants/constants";

import Calendar from "./Calendar";

import style from "./style.module.css";
import CalendarLengend from "./CalendarLengends";


const CalendarWrapper = ({ startDate = new Date() }) => {
  const [date, setDate] = useState(startDate);

  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

  const firstFullDate = startOfMonth(new Date(currentYear, currentMonth + 1, 0));
  const lastFullDate = endOfMonth(new Date(currentYear, currentMonth + 1, 0));

  let firstDayOfTheMonth = getDay(startOfMonth(new Date(currentYear, currentMonth, 1)));
  let lastDateOfMonth = getDate(lastFullDate);
  let lastDayOfMonth = getDay(endOfMonth(new Date(currentYear, currentMonth, lastDateOfMonth)));
  let lastDateOfLastMonth = getDate(endOfMonth(new Date(currentYear, currentMonth, 0)));

  const days = eachDayOfInterval({
    start: firstFullDate,
    end: lastFullDate
  });

  const handleDateChange = (dir) => {
    currentMonth = dir === "prev" ? currentMonth - 1 : currentMonth + 1;
    if (currentMonth < 0 || currentMonth > 11) {
      setDate(new Date(currentYear, currentMonth));
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
    } else {
      setDate(new Date(currentYear, currentMonth))
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <header className={style.header}>
          <p className={style.current_date}>{format(date, "MMM yyyy")}</p>
          <div className={style.icons}>
            <button type="button" className={`${style.icon} ${style.prev}`} onClick={() => handleDateChange("prev")}>
              <i className='bx bx-chevron-left'></i>
            </button>
            <button type="button" className={`${style.icon} ${style.next}`} onClick={() => handleDateChange("next")}>
              <i className='bx bx-chevron-right'></i>
            </button>
          </div>
        </header>
        <div className={style.calendar}>
          <ul className={style.weeks}>
            {DAYS_OF_THE_WEEK.map((week) => (<li key={week.id}>{week.short}</li>))}
          </ul>
          <Calendar
            firstDayOfTheMonth={firstDayOfTheMonth}
            lastDayOfMonth={lastDayOfMonth}
            lastDateOfLastMonth={lastDateOfLastMonth}
            days={days}
          />
        </div>
      </div>
      <CalendarLengend />
    </>
  );
};

export { CalendarWrapper }