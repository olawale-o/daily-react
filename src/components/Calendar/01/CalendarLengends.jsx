import style from "./style.module.css";

const CalendarLengend = () => {
  return (
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
  );
};

export default CalendarLengend;
