import React, { useContext } from "react";
import "./Statistique.css";
import Title from "../StatTitle/Title";
import Mcard from "../mini-card/Mcard";
import { LuAlertOctagon } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import CardProject from "../CardProject/CardProject.jsx";
// import { useTaskContext } from "../../hooks/useTaskContext";
// import { useReportContext } from "../../hooks/useReportContext";
// import { useReportContext } from "../../hooks/useReportContext";
import LineGraph from "../LineChart/Line";
import BarGraph from "../Bar/BarGraph";
import Calendar from "../CalendarStats/CalendarStats.jsx";

const Statistique = ({ tasksData, reportsData }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // console.log("this is rapport ", rapports);
  const statusCounts = tasksData.reduce(
    (counts, task) => {
      if (task.status === "Validé") {
        counts.valide += 1;
      } else if (task.status === "En cours") {
        counts.enCours += 1;
      } else if (task.status === "Refusé") {
        counts.refused += 1;
      }
      return counts;
    },
    { valide: 0, enCours: 0, refused: 0 }
  );
  const tasksPerDay = tasksData.reduce((counts, tasks) => {
    const taskDate = new Date(tasks.createdAt);

    const day = daysOfWeek[taskDate.getDay()];
    if (!counts[day]) {
      counts[day] = 0;
    }
    counts[day] += 1;
    return counts;
  }, {});
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const reportsThisMonth = reportsData.filter((report) => {
    const reportDate = new Date(report.createdAt);
    return (
      reportDate.getMonth() === currentMonth &&
      reportDate.getFullYear() === currentYear
    );
  });
  console.log("all reports ", reportsData);
  console.log("reports this month", reportsThisMonth);
  const tasksThisMonth = tasksData.filter((tasksData) => {
    const taskDate = new Date(tasksData.createdAt);
    return (
      taskDate.getMonth() === currentMonth &&
      taskDate.getFullYear() === currentYear
    );
  });

  const daysOf4weeks = {
    0: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    1: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    2: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    3: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    4: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    5: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    6: { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
  };

  const taskPerMonth = tasksData.reduce((countM, task) => {
    const date = new Date(task.createdAt);
    const dayOfMonth = date.getDate();

    const dayOfWeek = ["0", "1", "2", "3", "4", "5", "6"][date.getDay()];

    // Calculate the week of the month
    const weekOfMonth = Math.ceil(dayOfMonth / 7);

    countM[dayOfWeek]["week" + weekOfMonth] += 1;

    return countM;
  }, daysOf4weeks);

  console.log("this is the 2nd try: ", taskPerMonth[0]);

  const lineChardata1 = {
    labels: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    datasets: [
      {
        label: "Jours",
        data: [
          tasksPerDay.Monday,
          tasksPerDay.Tuesday,
          tasksPerDay.Wednesday,
          tasksPerDay.Thursday,
          tasksPerDay.Friday,
          tasksPerDay.Saturday,
          tasksPerDay.Sunday,
        ],

        borderRadius: 10,
        barPercentage: 0.5,
      },
    ],
  };

  const lineChardata = {
    labels: ["Refusé", "En Cours", "Validé"],
    datasets: [
      {
        label: "Tâches",
        data: [statusCounts.refused, statusCounts.enCours, statusCounts.valide],
        backgroundColor: ["#FF416C", " royalblue", " #a8e063"],
      },
    ],
  };

  return (
    <>
      <Title page="Dashboard" />
      <div className="gridding-container">
        <div className="leftCalendar-rightCard">
          {/* <div className="doubled-cards">
            <div className="two-cards"> */}
          <div className="leftCard">
            {" "}
            <Calendar taskPerMonth={taskPerMonth} />
          </div>

          <div className="twoCards">
            <Mcard
              label={"Tâches "}
              color={""}
              data={tasksThisMonth}
              per={"Mois"}
              icon={
                <span
                  style={{ color: "white" }}
                  class="material-symbols-outlined"
                >
                  task
                </span>
              }
              currentMonth={monthNames[currentMonth]}
            />

            <Mcard
              color={""}
              data={reportsThisMonth}
              label={"Rapports"}
              per={"Mois"}
              icon={<span class="material-symbols-outlined">folder_open</span>}
              currentMonth={monthNames[currentMonth]}
            />
          </div>

          {/* </div>
          </div> */}
        </div>
        <div className="charts">
          <div className="left-chart">
            <BarGraph
              Title={`taux d'acceptation ${Math.floor(
                (statusCounts.valide / tasksData.length) * 100
              )}% `}
              data={lineChardata}
            />
          </div>
          <div className="right-chart">
            {/* <BarGraph
              Title={`Nb Tâches Par Jour `}
              data={lineChardata1}
              averagePerDay={5}
            /> */}
            <CardProject />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistique;
