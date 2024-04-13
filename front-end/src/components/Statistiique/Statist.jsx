import React, { useContext } from "react";
import "./Statistique.css";
import Title from "../StatTitle/Title";
import Mcard from "../mini-card/Mcard";
import { LuAlertOctagon } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
// import { useReportContext } from "../../hooks/useReportContext";
// import { useReportContext } from "../../hooks/useReportContext";
import LineGraph from "../LineChart/Line";
import BarGraph from "../Bar/BarGraph";
const Statistique = ({ tasksData, reportsData }) => {
  console.log("rap data ", reportsData);
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
  const totalTasks = tasksData.length;

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
    labels: [""],
    datasets: [
      {
        label: "En cours",
        data: [statusCounts.enCours],
        backgroundColor: ["rgba(0, 0, 255, 0.8)"],
        borderRadius: 10,
        barPercentage: 0.5,
      },
      {
        label: "Validé",
        data: [statusCounts.valide],
        backgroundColor: ["rgba(0, 255, 0, 0.8)"],
        borderRadius: 10,
        barPercentage: 0.5,
      },
      {
        label: "Refusé",
        data: [statusCounts.refused],
        backgroundColor: ["rgba(255, 0, 0, 0.8)"],
        borderRadius: 10,
        barPercentage: 0.5,
      },
    ],
  };
  return (
    <>
      <Title page="Dashboard" />
      <div className="gridding-container">
        <div className="Cards-containerStat">
          {/* <div className="doubled-cards">
            <div className="two-cards"> */}
          <Mcard
            label={"Tâches "}
            color={"lightblue"}
            data={tasksThisMonth}
            per={"Mois"}
            icon={<FaTasks />}
            currentMonth={monthNames[currentMonth]}
          />
          <Mcard
            color={"lightpink"}
            data={tasksData}
            label={"Tâches"}
            per={"Semaine"}
            icon={<FaTasks />}
            currentMonth={""}
            /* thsi need to be fixed get the exact tasks for a week  */
          />
          {/* </div>
            <div className="two-cards"> */}
          <Mcard
            color={"lightgreen"}
            data={tasksData}
            label={"Rapports"}
            per={"Semaine"}
            icon={<HiOutlineDocumentReport />}
            currentMonth={""}
            /* thsi need to be fixed get the exact tasks for a week  */
          />
          <Mcard
            color={""}
            data={tasksData}
            label={"Rapports"}
            per={"Mois"}
            icon={<HiOutlineDocumentReport />}
            currentMonth={monthNames[currentMonth]}
          />
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
            <BarGraph
              Title={`Nb Tâches Par Jour `}
              data={lineChardata1}
              averagePerDay={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistique;
