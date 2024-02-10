
import { format, isToday } from "date-fns";
import { bookings } from "./data";
import style from "./style.module.css";

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

export default CalendarDays;
