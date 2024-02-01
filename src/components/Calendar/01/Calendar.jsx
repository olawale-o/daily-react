import { useState } from "react";

import { MONTHS, DAYS_OF_THE_WEEK } from "../constants/constants";

import style from "./style.module.css";

const CalendarPreviousDays = ({ firstDayOfTheMonth, lastDateOfLastMonth }) => {
  const prevDays = Array.from({ length: firstDayOfTheMonth + 1 }, (v, i) => lastDateOfLastMonth - i + 1);
  prevDays.shift();
  return (
    <>
      {prevDays.map((day, index) => (<li key={`prev-${index}`} className={style.inactive}>{day}</li>))}
    </>
  );
};

const CalendarNextDays = ({ lastDayOfMonth }) => {
  const nextDays = [];
  for (let i = lastDayOfMonth;  i < 6; i++) {
    nextDays.push(i - lastDayOfMonth + 1);
  }
  return (
    <>
      {nextDays.map((day, index) => (<li key={`next-${index}`} className={style.inactive}>{day}</li>))}
    </>
  );
};

const CalendarDays = ({ lastDateOfMonth, currentMonth, currentYear }) => {
  const currentTime = new Date();
  const currentDate = currentTime.getDate();
  const currentDateYear = currentTime.getFullYear();
  const currentDateMonth = currentTime.getMonth();
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  const currentDays = range(1, lastDateOfMonth, 1);

  const isToday = (day) => {
    return day === currentDate && currentMonth === currentDateMonth && currentYear === currentDateYear;
  };

  return (
    <>
      {currentDays.map((day, index) => (
        <li key={index} className={`${ isToday(day) ? style.today : ""}`}>
          {day}
        </li>
      ))}
    </>
  );
}

const Calendar = ({
  currentMonth,
  currentYear,
  firstDayOfTheMonth,
  lastDateOfMonth,
  lastDayOfMonth,
  lastDateOfLastMonth
}) => {

  return (
    <ul className={style.days}>
      <>
        <CalendarPreviousDays firstDayOfTheMonth={firstDayOfTheMonth} lastDateOfLastMonth={lastDateOfLastMonth} />
        <CalendarDays lastDateOfMonth={lastDateOfMonth} currentMonth={currentMonth} currentYear={currentYear} />
        <CalendarNextDays lastDayOfMonth={lastDayOfMonth} />
      </>
    </ul>
  )
}

const CalendarWrapper = ({ startDate = new Date() }) => {
  const [date, setDate] = useState(startDate);

  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

  let firstDayOfTheMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

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
    <div className={style.wrapper}>
      <header className={style.header}>
        <p className={style.current_date}>{MONTHS[currentMonth]}{' '}{currentYear}</p>
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
          currentMonth={currentMonth}
          currentYear={currentYear}
          firstDayOfTheMonth={firstDayOfTheMonth}
          lastDateOfMonth={lastDateOfMonth}
          lastDayOfMonth={lastDayOfMonth}
          lastDateOfLastMonth={lastDateOfLastMonth}
        />
      </div>
    </div>
  );
};

export { CalendarWrapper };
