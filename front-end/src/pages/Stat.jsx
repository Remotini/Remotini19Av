import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useAuthContext } from "../hooks/useAuthContext";
// import { Pie } from "react-chartjs-2";
import Statistique from "../components/Statistiique/Statist";
// import { Chart as ChartJS } from "chart.js/auto";
import { useReportContext } from "../hooks/useReportContext";
function Stat() {
  // const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await axios.get("http://localhost:5001/api/tasks");
  //     if (response) {
  //       setTasks(response.data.tasks);
  //       console.log(tasks);
  //     } else {
  //       console.log("error");
  //     }
  //   };

  //   fetchTasks();
  // }, []);
  const [tasksData, setTasksData] = useState([]);
  const rapports = useReportContext();
  // console.log("les rapports",rapports); ;
  const allReportIds = [rapports.map((report) => report._id)];
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/tasks?rapport_id=${allReportIds}`
        );
        setTasksData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchTasksData();
  }, []);

  return (
    <>
      <div className="All">
        <div className="App" />
        <Header />
        <div className="center-stat">
          <div className="the-nav">
            <NavBar />
          </div>

          <div className="stat_page">
            <Statistique tasksData={tasksData} reportsData={rapports} />
          </div>
        </div>
      </div>
      <div className="ft">
        <Footer />
      </div>
    </>
  );
}

export default Stat;
