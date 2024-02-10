import { range } from "../lib/range";
import style from "./CalendarPreviousDays";

const CalendarNextDays = ({ lastDayOfMonth }) => {
  const nextDays = range(lastDayOfMonth, 5, 1);
  return (
    <>
      {nextDays.map((day, index) => (<li key={`next-${index}`} className={style.inactive}>{day - lastDayOfMonth + 1}</li>))}
    </>
  );
};

export { CalendarNextDays };
