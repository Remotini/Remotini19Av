import dayjs from "./index.d.ts";
import React, { useState } from "react";
import { generateDate, months } from "./Calendar.js";

import "./CalendarStats.css";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="calendar-navigation">
          <div
            className="calendar-nav-icon"
            onClick={() => setToday(today.month(today.month() - 1))}
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
          <h1
            className="calendar-nav-today"
            onClick={() => setToday(currentDate)}
          >
            Today
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
              }`}
              onClick={() => setSelectDate(date)}
            >
              {date.date()}
            </div>
          )
        )}
      </div>
      <div className="schedule">
        <h1 className="schedule-title">{selectDate.toDate().toDateString()}</h1>
      </div>
    </div>
  );
}
