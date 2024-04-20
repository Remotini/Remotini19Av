import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Calendar.js";

import "./CalendarStats.css";

export default function Calendar({ taskPerMonth }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  function checkColor(number) {
    if (number === 0) {
      return "noTasks";
    } else if (number < 3) {
      return "moreTasks";
    } else {
      return "moreTasks3";
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {/* <h1 className="calendar-title">
          {months[today.month()]}, {today.year()}
        </h1> */}
        <h1
          className="calendar-nav-today"
          onClick={() => setToday(currentDate)}
        >
          Today
        </h1>
        <div className="calendar-navigation">
          <div
            className="calendar-nav-icon"
            onClick={() => setToday(today.month(today.month() - 1))}
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </div>
          {/* <h1
            className="calendar-nav-today"
            onClick={() => setToday(currentDate)}
          >
            Today
          </h1> */}
          <h1 className="calendar-title">
            {months[today.month()]}, {today.year()}
          </h1>
          <div
            className="calendar-nav-icon"
            onClick={() => setToday(today.month(today.month() + 1))}
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </div>
      </div>
      <div className="calendar-days">
        {days.map((day, index) => (
          <h1 key={index} className="calendar-day">
            {day}
          </h1>
        ))}
      </div>
      <div className="calendar-dates">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => (
            <div
              key={index}
              className={`calendar-date ${
                currentMonth ? "" : "not-current-month"
              } ${today ? "today" : ""} ${
                selectDate.toDate().toDateString() ===
                date.toDate().toDateString()
                  ? "selected"
                  : ""
              } ${checkColor(
                taskPerMonth[date.day()]["week" + Math.ceil(date.date() / 7)]
              )}`}
              onClick={() => setSelectDate(date)}
            >
              {date.date()}
            </div>
          )
        )}
      </div>
      <div className="schedule">
        <h1 className="schedule-title">{selectDate.toDate().toDateString()}</h1>
        <h4>Vous avez crée {taskPerMonth[selectDate.day()]["week" + Math.ceil(selectDate.date() / 7)]} tache(s)</h4>
      </div>
    </div>
  );
}
