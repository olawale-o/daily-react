import { useState } from "react";

import { eachDayOfInterval, endOfMonth, format, startOfMonth, isToday, getDay, getDate, isSameDay } from "date-fns";

import { DAYS_OF_THE_WEEK } from "../constants/constants";

import style from "./style.module.css";
import { bookings } from "./data";

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const CalendarPreviousDays = ({ firstDayOfTheMonth, lastDateOfLastMonth }) => {
  const prevDays = range(firstDayOfTheMonth, 1, -1);
  return (
    <>
      {prevDays.map((day, index) => (<li key={`prev-${index}`} className={style.inactive}>{lastDateOfLastMonth - day + 1}</li>))}
    </>
  );
};

const CalendarNextDays = ({ lastDayOfMonth }) => {
  const nextDays = range(lastDayOfMonth, 5, 1);
  return (
    <>
      {nextDays.map((day, index) => (<li key={`next-${index}`} className={style.inactive}>{day - lastDayOfMonth + 1}</li>))}
    </>
  );
};

console.log(bookings);
const CalendarDays = ({ days }) => {
  const isBooked = (day) => {
    return bookings.includes(day.getTime());
  };

  return (
    <>
      {days.map((day, index) => (
        <li key={index} className={`${isBooked(day) && isToday(day) && style.booked_today} ${isBooked(day) && style.booked} ${isToday(day) && style.today}`}>
          {format(day, "d")}
        </li>
      ))}
    </>
  );
};

const Calendar = ({
  firstDayOfTheMonth,
  lastDayOfMonth,
  lastDateOfLastMonth,
  days,
}) => {

  return (
    <ul className={style.days}>
      <>
        <CalendarPreviousDays firstDayOfTheMonth={firstDayOfTheMonth} lastDateOfLastMonth={lastDateOfLastMonth} />
        <CalendarDays days={days} />
        <CalendarNextDays lastDayOfMonth={lastDayOfMonth} />
      </>
    </ul>
  )
}

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
      <div className={style.legends}>
        <div className={style.legend}>
          <div className={`${style.div} ${style.booking}`}></div>
          <div className={style.name}>Booking</div>
        </div>
        <div className={style.legend}>
          <div className={`${style.div} ${style.booking_today}`}></div>
          <div className={style.name}>Today Booking</div>
        </div>
        <div className={style.legend}>
          <div className={`${style.div} ${style.reservation}`}></div>
          <div className={style.name}>Reservation</div>
        </div>
        <div className={style.legend}>
          <div className={`${style.div} ${style.reservation_today}`}></div>
          <div className={style.name}>Today Reservation</div>
        </div>
      </div>
    </>
  );
};

export { CalendarWrapper };