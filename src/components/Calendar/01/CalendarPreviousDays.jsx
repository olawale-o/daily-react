import { range } from "../lib/range";
import style from "./style.module.css";

const CalendarPreviousDays = ({ firstDayOfTheMonth, lastDateOfLastMonth }) => {
  const prevDays = range(firstDayOfTheMonth, 1, -1);
  return (
    <>
      {prevDays.map((day, index) => (<li key={`prev-${index}`} className={style.inactive}>{lastDateOfLastMonth - day + 1}</li>))}
    </>
  );
};

export default CalendarPreviousDays;
