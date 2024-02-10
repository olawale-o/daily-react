
import CalendarPreviousDays from "./CalendarPreviousDays";
import { CalendarNextDays } from "./CalendarNextdays";
import CalendarDays from "./CalendarDays";
import style from "./style.module.css";

const Calendar = ({
  firstDayOfTheMonth,
  lastDayOfMonth,
  lastDateOfLastMonth,
  days,
}) => {

  return (
    <ul className={style.days}>
      <>
        <CalendarPreviousDays
          firstDayOfTheMonth={firstDayOfTheMonth}
          lastDateOfLastMonth={lastDateOfLastMonth}
        />
        <CalendarDays days={days} />
        <CalendarNextDays lastDayOfMonth={lastDayOfMonth} />
      </>
    </ul>
  )
}

export default Calendar;